import CountUp from 'react-countup';
import Countdown from 'react-countdown';
import { useState, useEffect } from 'react';
import {
  HeroArea,
  TicketNow,
  TicketWallet,
  TicketFinished,
  PlayArea,
  BuyTicket,
  ConnectWallets,
  NumberContainer,
  ButtonContainer,
  Number
} from './styles';
import badgeTicket from '../../assets/ticket-badge.svg';
import star1 from '../../assets/star-small.png';
import star2 from '../../assets/star-big.png';
import star3 from '../../assets/ticket-l.png';
import star4 from '../../assets/three-stars.png';
import star5 from '../../assets/ticket-r.png';
import num3 from '../../assets/number/3.svg';
import num9 from '../../assets/number/9.svg';
import num8 from '../../assets/number/8.svg';
import num5 from '../../assets/number/5.svg';
import num6 from '../../assets/number/6.svg';
import num7 from '../../assets/number/7.svg';
import chat1 from '../../assets/chat1.png';
import chat2 from '../../assets/chat2.png';
import zmzabi from '../../abis/ZMZ_token.json';
import lotteryabi from '../../abis/Lottery.json';
import MainModal from '../..//components/Shared/MainModal';
import { ConnectWalletForm } from '../../components/Shared/ConnectWalletForm';
import { useCustomWallet } from '../../contexts/WalletContext';
import { ethers } from 'ethers';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
const ZMZ_CONTRACT_ADDRESS = '0x3fF71Dce2dbCd2E60907EA8811C4C2520b9f70e8';
const ZMZ_LOTTERY_CONTRACT_ADDRESS = '0x9579e3E8cC055e211C661209fa5bD980bED7E152';

export default function DefiLottery() {
  const renderer = ({ hours, minutes }) => {
    return (
      <span className="hoursTimes">
        {hours}
        <sub> h</sub> &nbsp;
        {minutes}
        <sub> m</sub>
      </span>
    );
  };

  const [lotteryDetails, setLotteryDetails] = useState(false);
  const [lotteryDetails2, setLotteryDetails2] = useState(false);
  const [lotteryDetails3, setLotteryDetails3] = useState(false);
  const [lotteryRound, setLotteryRound] = useState(false);
  const [buyTicketBox, setBuyTicketBox] = useState(false);
  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const [menu, setMenu] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [lotteryValue, setLotteryValue] = useState('');
  const [buttonStatus, setButtonStatus] = useState('approve');
  const [number, setNumber] = useState(100);
  const [eidtLotteryNumber, setEidtLotteryNumber] = useState([]);
  const [percent, setPercent] = useState(0);
  const [valueInput, setInputValue] = useState(1);
  const [costValue, setCostValue] = useState(0);
  const [actualCost, setActualCost] = useState("0");
  const [lotteryNumber, setLotteryNumbers] = useState([]);
  const [lotteryEndTime, setLotteryEndTime] = useState(0);
  const [finalNumber, setFinalNumber] = useState(0);
  const [winnerNumber, setWinnerNumber] = useState(0);
  const [amount, setAmount] = useState(0.0);
  const [lotteryStartTime, setLotteryStartTime] = useState(0);
  const [lotteryID, setLotteryID] = useState(0);
  const [inputField, setInputField] = useState(0);
  const [winnerCount, setWinnerCount] = useState(0);
  const [countForBracket, setCountForBracket] = useState([]);
  const [ticketIdsForClaim, setTicketIdsForClaim] = useState([]);
  const [boolTicketIdsForClaim, setBoolTicketIdsForClaim] = useState([]);
  const [lotteryTicketLength, setTotalTicketsLength] = useState(0);
  const [lotteryWinnerNumber, setLotteryWinnerNumbers] = useState([]);
  const [totalReward, setTotalReward] = useState(0);

  
  const { wallet } = useCustomWallet();
  


  const{t}=useTranslation()


  const handleConnectWallet = () => {
    setIsMenu(false);
    setShowConnectWallet(true);
  };

  const toggleBuyTicketBox = () => {
    setBuyTicketBox(!buyTicketBox);
  };
  const toggleRound = () => {
    setLotteryRound(!lotteryRound);
  };

  const toggleDetails = () => {
    setLotteryDetails(!lotteryDetails);
    handleLottery()
  };

  const toggleDetails2 = () => {
    setLotteryDetails2(!lotteryDetails2);
  };

  const toggleDetails3 = () => {
    setLotteryDetails3(!lotteryDetails3);
    getReward()
  };

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update the time every second

    return () => {
      clearInterval(intervalId);
    };
  }, []); // Run the effect only once, when the component is mounted

  const formattedDate = time.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const maxNumber = async (value) => {
    setInputValue(value);
  };
  
  const decreaseNumber = () => {
    if (valueInput > 1) {
      setInputValue(valueInput - 1);
     // getCost();
    }
  };
  const increaseNumber = () => {
    if (valueInput <= 99) {
      setInputValue(valueInput + 1);
     // getCost();
    }
  };

  useEffect(() => {
    handleLotteryInfo()
    GetRound()
  }, []);


  setTimeout(() => {
    handleEndTime();
  }, 10000);

  const random = () => {
    let randomNumber = 100000 + Math.floor(Math.random() * 900000);
    randomNumber = 1000000 + randomNumber;
    return randomNumber;
  };


  const handleMinus = () => {
    if (inputField > 0) {
      setInputField(inputField - 1);
      handleLotery(inputField - 1);
    }
  };
  const handlePlus = () => {
    if (Number(inputField) < 999) {
      setInputField(Number(inputField) + 1);
      handleLotery(Number(inputField) + 1);
    } else {
      setInputField(999);
      handleLotery(999);
    }
  };
  const handleLotteryOnChange = (e) => {
    if (e.target.value >= 0) {
      setInputField(e.target.value);
      handleLotery(e.target.value);
    } else {
      handleLotery(0);
    }
  };

  const ZmzContract = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const ZmzContract = new ethers.Contract(
        ZMZ_CONTRACT_ADDRESS,
        zmzabi,
        signer
      );
      return ZmzContract;
    } catch (error) {
      console.log(error);
    }
  };

  const ZmzLotteryContract = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const ZmzLotteryContract = new ethers.Contract(
        ZMZ_LOTTERY_CONTRACT_ADDRESS,
        lotteryabi,
        signer
      );
      return ZmzLotteryContract;
    } catch (error) {
      console.log(error);
    }
  };


  const GetRound = async () => {
    try {
      
        let _ZmzLotteryContract= await ZmzLotteryContract();
      const id = await _ZmzLotteryContract.viewCurrentLotteryId();
      const values = await _ZmzLotteryContract.viewLottery(id);

        if (values.status == 1) {
          setInputField(id);
          handleLotery(id);
        } else {
          setInputField(id);
          handleLotery(id);
        }
      
    } catch (error) {
      console.log("error while getting Round");
    }
  };

  const firstLotteryId = async () => {
    try {
      
        let _ZmzLotteryContract= await ZmzLotteryContract();
      const id = await _ZmzLotteryContract.viewCurrentLotteryId();
      const values = await _ZmzLotteryContract.viewLottery(id);

        if (id > 1) {
          setInputField(1);
          handleLotery(1);
        } else {
          handleLotery(0);
          setInputField(0);
        }
      
    } catch (error) {
      console.log("error while getting Round");
    }
  };
  const lastLotteryId = async () => {
    try {
      
      let _ZmzLotteryContract= await ZmzLotteryContract();
      const id = await _ZmzLotteryContract.viewCurrentLotteryId();
      const values = await _ZmzLotteryContract.viewLottery(id);
        if (values.status == 1) {
          setInputField(id - 1);
          handleLotery(id - 1);
        } else {
          setInputField(id);
          handleLotery(id);
        }
      
    } catch (error) {
      console.log("error while getting Round");
    }
  };

  const attachZero = (num) => {
    return ("00" + num).slice(-3);
  };

  const attachZeroNum = (num, index) => {
    return ("00" + num).slice(-index);
  };

  const handleEndTime = async () => {
    try {
      let _ZmzLotteryContract= await ZmzLotteryContract();
      const id = await _ZmzLotteryContract.viewCurrentLotteryId();
      let lotteryData = await _ZmzLotteryContract.viewLottery(id);
      let lotteryEndTime = lotteryData.endTime;
      let endTime = Number(lotteryEndTime);
      setLotteryEndTime(endTime);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleLotteryInfo = async () => {
    try {
      
      let _ZmzLotteryContract= await ZmzLotteryContract();
      const id = await _ZmzLotteryContract.viewCurrentLotteryId();
      const values = await _ZmzLotteryContract.viewLottery(id);

        if (values.status == 1) {
          handleLotery(id - 1);
        } else {
          handleLotery(id);
        }
      
    } catch (error) {
      console.log("error ", error);
    }
  };

  function reversedNum(num) {
    return (
      parseFloat(num.toString().split("").reverse().join("")) * Math.sign(num)
    );
  }
  const handleLotery = async (id) => {
    try {
      let _ZmzLotteryContract= await ZmzLotteryContract();
      let lotteryInfo = await _ZmzLotteryContract.viewLottery(id);
      let  date2 = new Date(lotteryInfo.startTime * 1000); 
      let formattedDate2 = date2.toLocaleString();
      setLotteryID(id);
      setLotteryStartTime(formattedDate2);
      let finalNumber = lotteryInfo.finalNumber;
      finalNumber = finalNumber % 1000000;
      let num = reversedNum(finalNumber);
      if (num.toString().length == 6) {
        num = num.toString();
      } else if (num.toString().length == 5) {
        num = "0" + num.toString();
      } else if (num.toString().length == 4) {
        num = "00" + num.toString();
      } else if (num.toString().length == 3) {
        num = "000" + num.toString();
      } else if (num.toString().length == 2) {
        num = "0000" + num.toString();
      } else if (num.toString().length == 1) {
        num = "00000" + num.toString();
      } else {
        num = "000000" + num.toString();
      }

      setWinnerNumber(num);
      setAmount(lotteryInfo.amountCollectedInZMX * 0.000001);
    } catch (error) {
      console.log("error while setting lottery");
    }
  };

  const handleLottery = async () => {
    try {
      let _ZmzLotteryContract = await ZmzLotteryContract();
      let lotteryInfo = await _ZmzLotteryContract.viewUserInfoForLotteryId(wallet.address, inputField, 0, 100);
     
        setTotalTicketsLength(lotteryInfo[3]);
      let array = [...lotteryInfo[1]];
      let newArray = array.map((item) => {
        item = reversedNum(item % 1000000);
        if (item.toString().length == 6) {
          item = item.toString();
        } else if (item.toString().length == 5) {
          item = "0" + item.toString();
        } else if (item.toString().length == 4) {
          item = "00" + item.toString();
        } else if (item.toString().length == 3) {
          item = "000" + item.toString();
        } else if (item.toString().length == 2) {
          item = "0000" + item.toString();
        } else if (item.toString().length == 1) {
          item = "00000" + item.toString();
        } else {
          item = "000000" + item.toString();
        }
        return item;
      });

      setLotteryWinnerNumbers(newArray);

      let num = winnerNumber;
      num = num.toString().split("");
      let totalLotteryWinnerNumber = 0;
      let countArray = [];
      let ticketIDs = [];
      let boolForTicketIds= [];
      newArray.map((item, index) => {
        let count = 1;
        let bool = true;
        let splitted = item.toString().split("");

        for (let i = 0; i < num.length; i++) {
          if (splitted[i] == num[i] && count > i) {
            count++;
            if (bool == true) {
              totalLotteryWinnerNumber++;
              bool = false;
              ticketIDs.push(lotteryInfo[0][index]);
              boolForTicketIds.push(lotteryInfo[2][index]);
            }
          }
        }
        if (count > 1) {
          countArray.push(count - 2);
        }
        setTicketIdsForClaim(ticketIDs);
        setCountForBracket(countArray);
        setBoolTicketIdsForClaim(boolForTicketIds);

        setWinnerCount(totalLotteryWinnerNumber);
      });
    } catch (error) {
      console.log("error while setting lottery");
    }
  };



  const handleLotteryZIMAX = async (val) => {
    try {

      setInputValue(val);
    } catch (error) {
      console.log(error);
    }
  };

  const getCost = async () => {
    try {
      
        let _ZmzLotteryContract= await ZmzLotteryContract();
      
        const id = await _ZmzLotteryContract.viewCurrentLotteryId();
        const values = await _ZmzLotteryContract.viewLottery(id);

        if (valueInput == 0) {
          setPercent(0);
        } else {
          let costForOne = await _ZmzLotteryContract.calculateTotalPriceForBulkTickets(
              values.discountDivisor,
              values.priceTicketInZMX,
              1
            );
      
        costForOne = (costForOne.toString() / 10 ** 5);
          let val = costForOne * 1;
          setCostValue(val);

          let acutalCostForBuy = await _ZmzLotteryContract.calculateTotalPriceForBulkTickets(
              values.discountDivisor,
              values.priceTicketInZMX,
              valueInput
            );
 

       
          acutalCostForBuy = (acutalCostForBuy.toString() / 10 ** 5);
          acutalCostForBuy = parseFloat(acutalCostForBuy).toFixed(4);
          setActualCost(acutalCostForBuy);

          let percentage = values.discountDivisor / 10000;
          percentage = parseFloat(percentage).toFixed(2);
          percentage = (percentage * valueInput).toFixed(2);

          setPercent(percentage);
        
          }
    } catch (error) {
      console.log("error while getting baby balance", error);
    }
  };


  const getReward = async () => {
    let ids = ticketIdsForClaim;
    let reward = 0;

    ids.map(async (item, index) => {
      let _ZmzLotteryContract= await ZmzLotteryContract();

      let rewardInfo = await _ZmzLotteryContract.viewRewardsForTicketId( lotteryID,item,countForBracket[index])
      reward = parseFloat(reward) + parseFloat((rewardInfo) * (10 ** 5));

      reward = reward.toFixed(4);
      setTotalReward(reward);
    });
  };
  const claimReward = async () => {
    let tickets = ticketIdsForClaim.map((item) => {
      return Number(item);
    });

    let res;
     boolTicketIdsForClaim.map((item) => {
      if (item == true) {
        res = true;
      } else {
        res = false;
      }
    });
  
    try {

      if (res != true) {

        let _ZmzLotteryContract= await ZmzLotteryContract();
        
        let _buy = await _ZmzLotteryContract.claimTickets(lotteryID, tickets, countForBracket)
        let waitForTx = await _buy.wait();
        if (waitForTx) {
        toast.success("You claim reward ");
        //props.onClose();
        } 
         console.log('wait claim ZIMAX', waitForTx);

      } else {
        toast.info("You already claimed the Reward");
       // props.onClose();
      }
    } catch (error) {
      toast.error("Transaction Failed");
    }
  };

  const handleApproveZMZ = async () => {
    console.log("userLotteryValue", valueInput)
    try {
      let _ZmzContract = await ZmzContract();
      console.log('contract---', _ZmzContract);
      console.log("🚀 ~ handleApproveZMZ ~ estimateValue", valueInput)
      let _approve = await _ZmzContract.approve(
        ZMZ_LOTTERY_CONTRACT_ADDRESS,
        ethers.utils.parseEther(valueInput)
      );
      let waitForTx = await _approve.wait();
      if (waitForTx) {
        console.log('wait handleApproveZIMAX', waitForTx);
        setButtonStatus('buy');
        toast.success('Approved successfull.');
        let array=[];
          for (let i = 1; i <= valueInput; i++) {
            let num = random();
            array = [...array, num];
          }
          setLotteryNumbers(array);
          getCost()
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleBuyZMX = async () => {
    console.log("userLotteryValue", valueInput)

    try {
    let _ZmzLotteryContract= await ZmzLotteryContract();
    if (valueInput <= 0) {
      return toast.error('Value should be positive.');
    }
    const id = await _ZmzLotteryContract.viewCurrentLotteryId();
  console.log("viewCurrentLotteryId in edit and buy", id);
    let array=[];
          for (let i = 1; i <= valueInput; i++) {
            let num = random();
            array = [...array, num];
          }
          setLotteryNumbers(array);
      let _buy = await _ZmzLotteryContract.buyTickets(id, array)
      let waitForTx = await _buy.wait();
      if (waitForTx) {
        toast.success('Transaction successfull.');
      }
      console.log('wait stakeZIMAX', waitForTx);
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
       <ToastContainer />
     {showConnectWallet && (
        <MainModal
          title={'My Wallet'}
          handleClose={() => setShowConnectWallet(false)}
        >
          <ConnectWalletForm
            goToSignIn={() => {
              setShowSignUp(false);
              setShowSignIn(true);
            }}
            handleClose={() => setShowConnectWallet(false)}
          />
        </MainModal>
      )}
      {buyTicketBox && (
        <BuyTicket>
          <div className="buyTicketInner">
            <h2>
              Buy Tickets{' '}
              <svg
                onClick={toggleBuyTicketBox}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            </h2>
            <h3>
              Buy:{' '}
              <strong>
                Tickets <img src={star5} alt="" />
              </strong>
            </h3>
            <div className="buyBmax">
              <input 
                type="text"
                pattern="\d*"
                placeholder="0000"
                    maxLength={3}
                    value={valueInput}
                onChange={(e) => handleLotteryZIMAX(e.target.value)}
              />
              <p>{actualCost} ZMX</p>
            </div>
            <h3>
              Cost (ZMX) <span>{costValue} ZMX</span>
            </h3>
            <h3>
               Bulk discount
              <span>{percent}% </span>
            </h3>
            <h4>
              You pay
              <strong>{actualCost}ZMX</strong>
            </h4>
            {window.web3 ? (
              <>
              {buttonStatus === 'approve' ? (
              <button onClick={handleApproveZMZ}>{t('APPROVE')}</button>
            ) : (
              <button onClick={handleBuyZMX}>{t('BUY TICKETS')}</button>
            )}
               </>
               ) : (
            <ConnectWallets onClick={handleConnectWallet}>
              <button>{t('Connect wallet')}</button>
            </ConnectWallets>
             )}
             <NumberContainer>
                {lotteryNumber &&
                  lotteryNumber.map((item, index) => (
                    <input
                      key={index}
                      type="text"
                      pattern="\d*"
                      maxLength={7}
                      // id="input"
                      placeholder="123456"
                      className="input"
                      value={item}
                     /*  onChange={(item) => {
                        handleChangeLotteryNumber(item, index);
                      }}  */
                    />
                  ))}
              </NumberContainer>
            <h5>
              "Buy Instantly" chooses random numbers, with no duplicates among
              your tickets. Prices are set before each round starts, equal to $5
              at that time. Purchases are final.
            </h5>
            
          </div>
        </BuyTicket>
      )}

      <HeroArea>
        <h2>The ZiMaxLottery</h2>
        <h3>
          $<CountUp end={83894} />
        </h3>
        <h4>in prizes!</h4>
        <img
          src={badgeTicket}
          onClick={toggleBuyTicketBox}
          className="badgeTicket"
          alt="badgeTicket"
        />
        <ul>
          <li>
            <img src={star1} alt="star1" />
          </li>
          <li>
            <img src={star2} alt="star1" />
          </li>
          <li>
            <img src={star3} alt="star1" />
          </li>
          <li>
            <img src={star4} alt="star1" />
          </li>
          <li>
            <img src={star5} alt="star1" />
          </li>
        </ul>
      </HeroArea>
      <TicketNow>
        <h2>Get your tickets now!</h2>
        <p className="ticketClock">
         {/*} <Countdown date={Date.now() + 10000000000} renderer={renderer} />  */}
      {lotteryEndTime !== 0 ? <Countdown
              date={Date.now() + 60000 * lotteryEndTime}
              renderer={renderer}
      /> : <p>00h : 00m</p>}   
          &nbsp;&nbsp;&nbsp;&nbsp; until the draw
        </p>
        <div className="ticketMainArea">
          <div className="ticketHeading">
            Next Draw <span>#818 | Draw: {formattedDate}</span>
          </div>
          <div className="ticketBody">
            <h2>
              Prize Pot{' '}
              <span>
               {/*} ~$83,411 */} <strong>{amount.toFixed(2)} ZMX</strong>
              </span>
            </h2>
            <h2>
              Your tickets{' '}
              <button onClick={toggleBuyTicketBox}>Buy Tickets</button>
            </h2>
          </div>
          <div className="ticketFooter">
            {lotteryDetails ? (
              <div className="ticket-footer-details">
                <p>
                  Match the winning number in the same order to share prizes.
                  Current prizes up for grabs:
                </p>
                <ul>
                  <li>
                    <strong>Match first 1</strong>{' '}
                    <p>
                      <CountUp end={425} /> ZMX
                    </p>
                    <span>
                      ~$ <CountUp end={1731} />
                    </span>
                  </li>
                  <li>
                    <strong>Match first 2</strong>{' '}
                    <p>
                      <CountUp end={638} /> ZMX
                    </p>
                    <span>
                      ~$ <CountUp end={2597} />
                    </span>
                  </li>
                  <li>
                    <strong>Match first 3</strong>{' '}
                    <p>
                      <CountUp end={1063} /> ZMX
                    </p>
                    <span>
                      ~$ <CountUp end={4328} />
                    </span>
                  </li>
                  <li>
                    <strong>Match first 4</strong>{' '}
                    <p>
                      <CountUp end={2125} /> ZMX
                    </p>
                    <span>
                      ~$ <CountUp end={8656} />
                    </span>
                  </li>
                  <li>
                    <strong>Match first 5</strong>{' '}
                    <p>
                      <CountUp end={4250} /> ZMX
                    </p>
                    <span>
                      ~$ <CountUp end={17313} />
                    </span>
                  </li>
                  <li>
                    <strong>Match first 6</strong>{' '}
                    <p>
                      <CountUp end={8501} /> ZMX
                    </p>
                    <span>
                      ~$ <CountUp end={34619} />
                    </span>
                  </li>
                  <li>
                    <strong className="red-burn">Burn</strong>{' '}
                    <p>
                      <CountUp end={4250} /> ZMX
                    </p>
                    <span>
                      ~$ <CountUp end={17309} />
                    </span>
                  </li>
                </ul>
              </div>
            ) : (
              ''
            )}

            <button>
              {lotteryDetails ? (
                <div onClick={toggleDetails}>
                  Hide
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                    />
                  </svg>
                </div>
              ) : (
                <div onClick={toggleDetails}>
                  Have I won?
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-down"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </div>
              )}
            </button>
          </div>
        </div>
      </TicketNow>
      <TicketWallet>
        <h3>
          Connect your wallet <br /> to check if you've won!
        </h3>
        <ConnectWallets onClick={handleConnectWallet}>
              <button>{t('Connect wallet')}</button>
        </ConnectWallets>
      {/*  <button onClick={toggleBuyTicketBox}>Connect Wallet</button>  */}
        <ul>
          <li>
            <img src={star3} alt="star1" />
          </li>
          <li>
            <img src={star5} alt="star1" />
          </li>
        </ul>
      </TicketWallet>
      <TicketFinished>
        <h2>Finished Rounds</h2>
        <div className="ticketFinishedArea">
          <button
            onClick={toggleRound}
            className={!lotteryRound ? 'active' : ''}
          >
            All History
          </button>
          <button
            onClick={toggleRound}
            className={lotteryRound ? 'active' : ''}
          >
            your history
          </button>
        </div>
        <div className="roundArea">
          {!lotteryRound && (
            <div className="round" >
              <h2>
                Round {/*<span>{817}</span> */}
              </h2>
              <h4
              onClick={() => {
                handleMinus();
              }}
              style={{ cursor: "pointer" }}
            >{`<`}</h4>
              <input 
                type="text"
                pattern="\d*"
                placeholder="0000"
                style={{
                  width: "60px",
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  padding: "0px 4px",
                  fontSize: 26,
                  fontWeight: "600",
                }}
                onChange={(e) => {
                      handleLotteryOnChange(e);
                }}
                  maxLength={3}
                  value={attachZero(inputField)}
              />
            {/*  <p>Drawn {formattedDate}</p> */}
            <h4
              onClick={() => {
                handlePlus();
              }}
              style={{ cursor: "pointer" }}
            >{`>`}</h4>
            <h3
              onClick={() => {
                firstLotteryId();
              }}
              style={{ cursor: "pointer" }}
            >
              First
            </h3>
            <h3
              onClick={() => {
                lastLotteryId();
              }}
              style={{ cursor: "pointer" }}
            >
              Last
            </h3>
              <div className="round-number" >
                <h3>Winning Number</h3>
                <p style={{ fontSize: "32px" }}> {winnerNumber} </p>
                <ButtonContainer>
                   <button onClick={toggleDetails2}>YOUR TICKETS</button>
                </ButtonContainer>
                <p style={{ fontSize: "32px" }}>
                Have I won?
              </p>
              <ButtonContainer>
                   <button  onClick={toggleDetails}>CHECK NOW</button>
                </ButtonContainer>
              </div>
              <div className="ticketFooter">
                {lotteryDetails2 ? (
                  <div className="ticket-footer-details">
                    <p>
                  Round  <strong>{lotteryID}</strong>
                    </p>
                    <p>
                    WINNING NUMBER: </p> {winnerNumber
                  .toString()
                  .split("")
                  .map((item, index) => (
                    <Number key={index}>{item}</Number>
                  ))}

                  <NumberContainer>
                <p  style={{ display: "flex" }}>
                  YOUR TICKETS:
                </p>
                <p
                
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                  mb="3px"
                >
                  <span style={{ paddingLeft: 20 }}>💸 Total tickets:</span>
                  <span>{lotteryTicketLength}</span>
                </p>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                  mb="3px"
                >
                  <span style={{ paddingLeft: 20 }}>🎁 Winning tickets:</span>
                  <span>{winnerCount}</span>
                </p>
                {lotteryWinnerNumber &&
                  lotteryWinnerNumber.map((item, index) => (
                    <div>
                    <p style={{ fontSize: 12, margin: 0 }}>
                        #{attachZeroNum(index + 1, 3)}
                      </p>
                      <p id="input">{item}</p>
                </div>
                  ))}
              </NumberContainer>
              <ButtonContainer>
              {winnerCount && winnerCount > 0 ? (
                <button onClick={toggleDetails3}>Collect Prizes</button>
              ) : (
                <button
                  onClick={() =>
                    toast.info("Oops! you  don't have any winning Ticket")
                  }
                >
                  Collect Prizes
                </button>
              )}
              </ButtonContainer>
                  
                  </div>
                ) : (
                  ''
                )}

{lotteryDetails3 ? (
                  <div className="ticket-footer-details">
                    <p>
            Collect Winnings 
                    </p>
                    <p>
                    YOU WON! </p> 
                    <p
                
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  fontWeight: "700",
                  letterSpacing: 1.4,
                }}
              >
                <span>{totalReward} ZMX!</span>
                <span>🎁</span>
              </p>
              <p
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
               
              >
                Round #{lotteryID}
              </p>
                  
              <ButtonContainer>
              <button onClick={() => claimReward()}>Claim</button>
            </ButtonContainer>
                  
                  </div>
                ) : (
                  ''
                )}

                <button>
                  {lotteryDetails2 ? (
                    <div onClick={toggleDetails2}>
                      Hide
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-chevron-up"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div onClick={toggleDetails2}>
                      Details
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-chevron-down"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              </div>
            </div>
          )}
          {lotteryRound && (
            <div className="round-history">
              <h2>Rounds</h2>
              <div className="round-history-body">
                <p>Connect your wallet to check your history</p>
              {/*  <button>Connect Wallet</button>  */}
              <ConnectWallets onClick={handleConnectWallet}>
              <button>{t('Connect wallet')}</button>
            </ConnectWallets>
              </div>
              <div className="round-footer">
                <p>Only showing data for Lottery V2</p>
              </div>
            </div>
          )}
        </div>
      </TicketFinished>
      <PlayArea>
        <h2>How to Play</h2>
        <p>
          If the digits on your tickets match the winning numbers in the correct
          order, you win a portion of the prize pool. Simple!
        </p>
        <ul>
          <li>
            <span>STEP 1</span>
            <h2>Buy Tickets</h2>
            <p>
              Prices are set when the round starts, equal to 5 USD in ZMX per
              ticket.
            </p>
          </li>
          <li>
            <span>STEP 2</span>
            <h2>Wait for the Draw</h2>
            <p>
              There is one draw every day alternating between 0 AM UTC and 12 PM
              UTC.
            </p>
          </li>
          <li>
            <span>STEP 3</span>
            <h2>Check for Prizes</h2>
            <p>
              Once the round’s over, come back to the page and check to see if
              you’ve won!
            </p>
          </li>
        </ul>
        <div className="playDetails">
          <div className="playDetailsLeft">
            <h2>Winning Criteria</h2>
            <h3>
              The digits on your ticket must match in the correct order to win.
            </h3>
            <p>Here’s an example lottery draw, with two tickets, A and B.</p>
            <ul>
              <li>
                Ticket A: The first 3 digits and the last 2 digits match, but
                the 4th digit is wrong, so this ticket only wins a “Match first
                3” prize.
              </li>
              <li>
                Ticket B: Even though the last 5 digits match, the first digit
                is wrong, so this ticket doesn’t win a prize.
              </li>
            </ul>

            <p>
              Prize brackets don’t ‘stack’: if you match the first 3 digits in
              order, you’ll only win prizes from the ‘Match 3’ bracket, and not
              from ‘Match 1’ and ‘Match 2’.
            </p>
          </div>
          <div className="playDetailsRight">
            <img src={chat1} alt="chat" />
          </div>
        </div>
        <div className="playDetails">
          <div className="playDetailsLeft">
            <h2>Prize Funds</h2>
            <p>The prizes for each lottery round come from three sources:</p>
            <h3>Ticket Purchases</h3>
            <ul>
              <li>
                100% of the ZMX paid by people buying tickets that round goes
                back into the prize pools.
              </li>
            </ul>
            <h3>Rollover Prizes</h3>
            <ul>
              <li>
                After every round, if nobody wins in one of the prize brackets,
                the unclaimed ZMX for that bracket rolls over into the next
                round and are redistributed among the prize pools.
              </li>
            </ul>
            <h3>ZMX Injections</h3>
            <ul>
              <li>
                An average total of 35,000 ZMX from the treasury is added to
                lottery rounds over the course of a week. This ZMX is of course
                also included in rollovers! Read more in our guide to ZMX
                Tokenomics
              </li>
            </ul>
          </div>
          <div className="playDetailsRight">
            <img src={chat2} alt="chat" />
          </div>
        </div>
      </PlayArea>
    </>
  );
}
