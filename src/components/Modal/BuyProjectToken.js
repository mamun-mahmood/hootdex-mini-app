import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import {
  Alert,
  Avatar,
  Collapse,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Paper,
  StepConnector,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { useEffect, useState } from 'react';
import axios from 'axios';
import url from '../../serverUrl';

const style = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  bgcolor: 'drak',
  border: '2px solid #000',
  boxShadow: 24,
  maxHeight: '100%'
  // p: 2
};

const removeDuplicatedToken = (allData) => {
  for (let i = 0; i < allData.length; i++) {
    for (let j = i + 1; j < allData.length; j++) {
      if (allData[i].symbol == allData[j].symbol) {
        allData[i].wrapAmount = allData[j].wrapAmount + allData[i].wrapAmount;
        allData[i].initialFinal =
          allData[j].initialFinal + allData[i].initialFinal;
        allData = allData.filter((e) => e !== allData[j]);
      }
    }
  }

  for (let i = 0; i < allData.length; i++) {
    for (let j = i + 1; j < allData.length; j++) {
      if (allData[i].symbol == allData[j].symbol) {
        return removeDuplicatedToken(allData);
      }
    }
  }

  return allData;
};
function convertToInternationalCurrencySystem(labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + 'b'
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + 'm'
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + 'k'
    : Math.abs(Number(labelValue))
    ? Math.abs(Number(labelValue))?.toFixed(2)
    : '0.00';
}

export default function BuyProjectToken({ each, user, pecuCoins }) {
  const wallet = JSON.parse(
    localStorage.getItem('hootdex_secretcookie_wallet')
  );

  const [open, setOpen] = useState(false);
  const [totalCoins, setTotalCoins] = useState('');
  const [totalValue, setTotalValue] = useState('');
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedtoken] = useState(tokens[0]);
  const [selectedTokenId, setSelectedtokenId] = useState(tokens[0]?.id);
  useEffect(() => {
    // const fetchToken = (target) => {
    // if (target === "all") {

    axios
      .get(`${url}/wallet/get_all_tokens_wrap`)
      .then((res) => {
        if (res.data.status) {
          setTokens(removeDuplicatedToken(res.data.tokens));
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // } else {
    //   setLoading(true);
    //   setTokens(tokens.filter((each) => each.tokenName === target));
    //   setLoading(false);
    // }
    // };
    // fetchToken("all");
  }, []);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [totalToken, setTotalToken] = useState(0);
  const handleChange = (e) => {
    // setInputData({ ...inputData, [e.target.name]: e.target.value });
    // let changeData = { ...inputData };
    // let name = e.target.name;
    // let value = e.target.value;
    // changeData[name] = value;
    // setInputData(changeData);
    setTotalToken(e.target.value);
  };
  const [alert, setAlert] = useState({
    msg: '',
    type: '',
    loading: false
  });
  const handleSubmit = (e) => {
    // if ( totalToken > 0 && pecuCoins?.coin >= inputData.pecuCoin) {
    axios
      .post(`${url}/hootdex/buy-tokens`, {
        userName: user.username,
        tokenAmount: totalToken,
        token: each,
        reqId: Math.floor(Math.random() * 1000000 + 1),
        bTime: new Date()
      })
      .then((res) => {
        if (res.data.status === 'error') {
          setAlert({
            msg: res.data.msg,
            type: 'error',
            show: true
          });
          setTimeout(() => {
            setAlert({
              msg: res.data.msg,
              type: 'error',
              show: false
            });
          }, 4000);
        }
        if (res.data.affectedRows > 0) {
          window.scrollTo(0, 0);
          setAlert({
            msg: 'Token Purchased!',
            type: 'success',
            show: true
          });
          setTimeout(() => {
            setAlert({
              msg: 'Token Purchased!',
              type: 'success',
              show: false
            });
          }, 3000);
        }
      })
      .catch((err) => {
        setAlert({
          msg: 'There was an error!',
          type: 'error',
          show: true
        });
        setTimeout(() => {
          setAlert({
            msg: 'There was an error!',
            type: 'error',
            show: false
          });
        }, 3000);
      });
    // } else {
    //   setAlert({
    //     msg: "You don't have enough Pecu coin!",
    //     type: "error",
    //     show: true,
    //   });
    //   setTimeout(() => {
    //     setAlert({
    //       msg: "You don't have enough Pecu coin!",
    //       type: "error",
    //       show: false,
    //     });
    //   }, 3000);
    // }
  };
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const getMyCoins = (id) => {
    if (id) {
      axios
        .post(`${url}/wallet/getMycoins`, {
          user_id: id
        })
        .then((res) => {
          const { total_coins, value } = res.data;
          setTotalCoins(total_coins);
          setTotalValue(value);
        });
    }
  };

  useEffect(() => {
    if (wallet && wallet.uid) {
      getMyCoins(wallet.uid);
    } else {
      setAlert({
        msg: 'Please Connect wallet!',
        type: 'error',
        show: true
      });
    }
  }, [wallet]);

  useEffect(() => {
    setSelectedtoken(tokens.filter((e) => e.id == selectedTokenId)[0]);
  }, [selectedTokenId]);
  useEffect(() => {
    setSelectedtoken(tokens.filter((e) => e?.symbol !== each?.symbol)[0]);
  }, [tokens]);

  return (
    <>
      <IconButton
        sx={{
          backgroundColor: '#091e17',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '12px',
          cursor: 'pointer',
          maxHeight: '40px',
          fontSize: '14px'
        }}
        className="shadow"
        onClick={handleOpen}
      >
        <p>Swap</p>
      </IconButton>
      <Dialog
        fullWidth={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none'
          }
        }}
        sx={{ zIndex: 2002 }}
        disableScrollLock={true}
      >
        {wallet && wallet.uid ? (
          <Box className="border" sx={{ backdropFilter: 'blur(5px)', p: 3 }}>
            {/* <StepConnector /> */}
            {/* <Box
              sx={{
                mt: 2,
                ml: '150px',
                position: 'fixed',
                zIndex: 1000,
                top: 0
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Collapse
                  in={alert.show}
                  sx={{ maxWidth: 400, position: 'fixed' }}
                >
                  <Alert
                    variant="outlined"
                    severity={alert.type}
                    sx={{ mb: 2, backgroundColor: 'white', fontSize: '18px' }}
                  >
                    {alert.msg}
                  </Alert>
                </Collapse>
              </div>
            </Box> */}
            <span
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly'
              }}
            >
              <span
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}
              >
                <Avatar
                  className="rounded"
                  alt="token logo"
                  style={{
                    width: '16px',
                    height: '16px',
                    color: 'rgb(86, 90, 105)',
                    marginRight: '8px',
                    color: 'gray'
                  }}
                  src={selectedToken?.image}
                />{' '}
                <p
                  className="fontS10"
                  style={{ color: 'grey', fontSize: '12px' }}
                >
                  1 {selectedToken?.symbol}
                </p>
              </span>
              <p
                className="fontS10"
                style={{ color: 'grey', fontSize: '12px' }}
              >
                {'='}
              </p>
              <span
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}
              >
                <Avatar
                  className="rounded"
                  alt="token logo"
                  style={{
                    width: '16px',
                    height: '16px',
                    color: 'rgb(86, 90, 105)',
                    marginRight: '8px'
                  }}
                  src={each?.image}
                />{' '}
                <p
                  className="fontS15"
                  style={{ color: 'grey', fontSize: '12px' }}
                >
                  {Math.floor(
                    selectedToken?.initialFinal / selectedToken?.wrapAmount
                  ).toFixed(18) / each?.token_price}{' '}
                  {each?.token_symbol}
                </p>
              </span>
            </span>
            <p
              style={{ color: 'white', fontSize: '15px', textAlign: 'center' }}
            >
              or
            </p>
            <span
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly'
              }}
            >
              <span
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}
              >
                <Avatar
                  className="rounded"
                  alt="token logo"
                  style={{
                    width: '16px',
                    height: '16px',
                    color: 'rgb(86, 90, 105)',
                    marginRight: '8px',
                    color: 'gray'
                  }}
                  src={each?.image}
                />{' '}
                <p
                  className="fontS10"
                  style={{ color: 'grey', fontSize: '12px' }}
                >
                  1 {each?.token_symbol}
                </p>
              </span>
              <p
                className="fontS10"
                style={{ color: 'grey', fontSize: '12px' }}
              >
                {'='}
              </p>
              <span
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}
              >
                <Avatar
                  className="rounded"
                  alt="token logo"
                  style={{
                    width: '16px',
                    height: '16px',
                    color: 'rgb(86, 90, 105)',
                    marginRight: '8px'
                  }}
                  src={selectedToken?.image}
                />{' '}
                <p
                  className="fontS15"
                  style={{ color: 'grey', fontSize: '12px' }}
                >
                  {each?.token_price /
                    Math.floor(
                      selectedToken?.initialFinal / selectedToken?.wrapAmount
                    ).toFixed(2)}{' '}
                  {selectedToken?.symbol}
                </p>
              </span>
            </span>
            <br></br>
            <Grid
              container
              spacing={{ xs: 1, md: 2 }}
              style={{ flexDirection: 'column' }}
            >
              <Grid item xs={12} md={4}>
                <Paper
                  style={{
                    textAlign: 'center',
                    backgroundColor: '#00071a',
                    minWidth: '300px'
                  }}
                  className="border tShadow"
                >
                  <div
                    style={{
                      color: 'white',
                      wordWrap: 'break-word'
                    }}
                  >
                    <div
                      className="rounded center-width tUpper"
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        color: 'grey',
                        fontSize: '12px'
                      }}
                    >
                      <h5>From</h5>
                      <h5>Balance:{parseFloat(totalCoins).toFixed(2)} PECU </h5>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: '5px'
                      }}
                    >
                      <input
                        autoFocus
                        type={'number'}
                        style={{ outline: 'none' }}
                      />

                      <span
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Avatar
                          className="rounded"
                          alt="token logo"
                          style={{
                            width: '18px',
                            height: '18px',
                            color: 'rgb(86, 90, 105)',
                            marginRight: '8px'
                          }}
                          src={selectedToken?.image}
                        />{' '}
                        {/* <p className="fontS15">{selectedToken?.symbol}</p> */}
                        <select
                          onChange={(e) => {
                            setSelectedtokenId(e.target.value);
                          }}
                          style={{
                            backgroundColor: 'transparent',
                            color: 'white',
                            outline: 'none',
                            border: '1px solid #01402b'
                          }}
                          value={selectedTokenId}
                        >
                          {tokens
                            .filter((e) => e?.symbol !== each?.token_symbol)
                            .map((e, i) => (
                              <option className="fontS15" key={i} value={e.id}>
                                {e.symbol}
                              </option>
                            ))}
                        </select>
                      </span>
                    </div>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper
                  style={{
                    textAlign: 'center',
                    backgroundColor: '#00071a',
                    minWidth: '300px'
                  }}
                  className="border tShadow"
                >
                  <div
                    style={{
                      color: 'white',
                      wordWrap: 'break-word'
                    }}
                  >
                    <div
                      className="rounded center-width tUpper"
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        color: 'grey',
                        fontSize: '13px'
                      }}
                    >
                      <h5>To (estimated)</h5>
                      <h5>Balance:0 </h5>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: '5px'
                      }}
                    >
                      <input
                        autoFocus
                        type={'number'}
                        style={{ outline: 'none' }}
                      />
                      <span
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Avatar
                          className="rounded"
                          alt="token logo"
                          style={{
                            width: '18px',
                            height: '18px',
                            color: 'rgb(86, 90, 105)',
                            marginRight: '8px'
                          }}
                          src={each?.image}
                        />{' '}
                        <p className="fontS15">{each?.token_symbol}</p>
                      </span>
                    </div>
                  </div>
                </Paper>
              </Grid>
              {/* <Grid item xs={12} md={4}>
              <Paper
                style={{
                  textAlign: 'center',
                  backgroundColor: '#00071a',
                  minWidth: '300px'
                }}
                className="border tShadow"
              >
                <div
                  style={{
                    color: 'white',
                    wordWrap: 'break-word'
                  }}
                >
                  <div
                    className="rounded center-width tUpper"
                    style={{ backgroundColor: '#002945' }}
                  >
                    <h3>Price</h3>
                  </div>
                  <p className="fontS22">{each?.tokenPrice}</p>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                style={{
                  textAlign: 'center',
                  backgroundColor: '#00071a',
                  minWidth: '300px'
                }}
                className="border tShadow"
              >
                <div
                  style={{
                    color: 'white',
                    wordWrap: 'break-word'
                  }}
                >
                  <div
                    className="rounded center-width tUpper"
                    style={{ backgroundColor: '#002945' }}
                  >
                    <h3>Value (USD)</h3>
                  </div>
                  <p className="fontS22">$ {each?.investementAmount}</p>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                style={{
                  textAlign: 'center',
                  backgroundColor: '#00071a',
                  minWidth: '300px'
                }}
                className="border tShadow"
              >
                <div
                  style={{
                    color: 'white',
                    wordWrap: 'break-word'
                  }}
                >
                  <div
                    className="rounded center-width tUpper"
                    style={{ backgroundColor: '#002945' }}
                  >
                    <h3>Select Amount </h3>
                  </div>
                  <p className="fontS22">
                    <input
                      className="tcenter"
                      style={{
                        width: '3rem'
                      }}
                      type="number"
                      onChange={handleChange}
                      name="totalToken"
                    />
                  </p>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                style={{
                  textAlign: 'center',
                  backgroundColor: '#00071a',
                  minWidth: '300px'
                }}
                className="border tShadow"
              >
                <div
                  style={{
                    color: 'white',
                    wordWrap: 'break-word'
                  }}
                >
                  <div
                    className="rounded center-width tUpper"
                    style={{ backgroundColor: '#002945' }}
                  >
                    <h3>Pecu Coin (EQ)</h3>
                  </div>
                  <p className="fontS22">{each?.pecuCoin}</p>
                </div>
              </Paper>
            </Grid> */}
              <Grid item xs={12}>
                <div style={{ textAlign: 'center' }}>
                  <Button
                    // onClick={handleSubmit}
                    className="border"
                    variant="contained"
                    sx={{
                      color: 'white',
                      backgroundColor: '#01402b',
                      width: '100%'
                    }}
                  >
                    Swap
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box
            sx={{
              mt: 2,

              position: 'fixed',
              zIndex: 1000,
              top: 0
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Collapse
                in={alert.show}
                sx={{ maxWidth: 400, position: 'fixed' }}
              >
                <Alert
                  variant="outlined"
                  severity={alert.type}
                  sx={{ mb: 2, backgroundColor: 'white', fontSize: '18px' }}
                >
                  {alert.msg}
                </Alert>
              </Collapse>
            </div>
          </Box>
        )}
      </Dialog>
    </>
  );
}
