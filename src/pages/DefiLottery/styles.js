import styled from 'styled-components';

export const HeroArea = styled.div`
  background: linear-gradient(rgb(0, 0, 209) 0%, rgb(255, 255, 2) 50%);
  text-align: center;
  color: #fff;
  padding: 90px 10px;
  position: relative;
  z-index: 1;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/images/lottery-bg.svg') center 0px no-repeat;
    z-index: -1;
  }
  h2 {
    font-size: 20px;
    font-weight: 700;
  }
  h3 {
    color: #febd31;
    font-size: 50px;
    line-height: 1;
    margin: 24px;
  }

  @keyframes updown {
    0% {
      transform: translateY(0) rotate(0);
    }
    25% {
      transform: translateY(-2px) rotate(-2deg);
    }
    50% {
      transform: translateY(0) rotate(0);
    }
    75% {
      transform: translateY(2px) rotate(2deg);
    }
    100% {
      transform: translateY(0) rotate(0);
    }
  }

  @keyframes upDownAni {
    0% {
      top: 0;
    }
    50% {
      top: 10px;
    }
    100% {
      top: 0;
    }
  }

  .badgeTicket {
    cursor: pointer;
    animation: updown 3s infinite;
    transform-origin: center;
    &:hover {
      filter: brightness(1.1);
    }
  }

  ul li:nth-child(1) {
    position: absolute;
    top: 70px;
    left: 180px;
    img {
      max-width: 100px;
    }
  }
  ul li:nth-child(2) {
    position: absolute;
    top: 210px;
    left: 120px;
    img {
      max-width: 160px;
    }
  }
  ul li:nth-child(3) {
    position: absolute;
    top: 380px;
    left: 230px;
    img {
      max-width: 100px;
    }
  }
  ul li:nth-child(4) {
    position: absolute;
    top: 90px;
    right: 150px;
    img {
      max-width: 130px;
    }
  }
  ul li:nth-child(5) {
    position: absolute;
    top: 330px;
    right: 180px;
    img {
      max-width: 90px;
    }
  }
  ul li img {
    position: relative;
    animation-name: upDownAni;
    animation-duration: 2s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }
  @media screen and (max-width: 991px) {
    ul {
      display: none;
    }
    .badgeTicket {
      max-width: 220px;
    }
  }
`;
export const TicketNow = styled.div`
  background: linear-gradient(rgb(0, 0, 209) 0%, rgb(255, 255, 2) 100%);
  padding: 70px 10px;
  text-align: center;

  h2 {
    color: #fff;
    font-size: 40px;
  }
  .hoursTimes {
    color: #fdc122;
    font-weight: 700;
    font-size: 32px;
  }
  .ticketClock {
    color: #fff;
    font-weight: 700;
    font-size: 18px;
  }
  .ticketMainArea {
    max-width: 800px;
    margin: auto;
  }
  .ticketHeading {
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #3a394d;
    padding: 20px 50px;
    color: #fff;
    border-radius: 15px;
    font-weight: 700;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    font-size: 20px;
  }

  .ticketHeading span {
    font-weight: 500;
    font-size: 14px;
  }
  .ticketBody {
    background: #27262c;
    text-align: left;
    padding: 20px 50px;
    border-bottom: 1px solid #383242;
  }

  .ticketBody h2 {
    font-size: 20px;
    display: flex;
    gap: 80px;
  }

  .ticketBody h2 span {
    color: #9a6bff;
    font-size: 40px;
  }

  .ticketBody h2 span strong {
    display: block;
    font-weight: 300;
    font-size: 14px;
  }

  .ticketBody h2 button {
    background: #20c7d4;
    color: #000;
    border: none;
    padding: 15px 30px;
    font-weight: 700;
    font-size: 16px;
    border-radius: 50px;
    cursor: pointer;
  }
  .ticket-footer-details {
    background: #08060b;
    color: #fff;
    padding: 10px 50px 40px;
    text-align: left;
  }

  .ticket-footer-details ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 30px;
  }

  .ticket-footer-details ul li strong {
    color: #9a6bff;
  }

  .ticket-footer-details ul li p {
    font-weight: 700;
    margin: 6px 0;
    font-size: 18px;
  }

  .ticket-footer-details ul {
    margin-top: 30px;
  }

  .ticket-footer-details ul li span {
    color: #b8add3;
    font-size: 14px;
  }

  .ticket-footer-details ul li p span {
    color: #fff;
    font-size: 18px;
  }
  .red-burn {
    color: #ee4b9e !important;
  }
  .ticketFooter button {
    background: #27262c;
    width: 100%;
    border: none;
    color: #20c7d4;
    font-weight: 700;
    font-size: 16px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    padding: 20px;
    cursor: pointer;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }
  }
  @media screen and (max-width: 991px) {
    .ticket-footer-details ul {
      grid-template-columns: 1fr;
    }
    .ticketHeading {
      padding: 20px 10px;
      gap: 30px;
    }
    .ticketBody h2 {
      display: grid;
      gap: 20px;
    }
    .ticketBody {
      display: grid;
    }
  }
`;
export const TicketWallet = styled.div`
  background: linear-gradient(
    139.73deg,
    rgb(49, 61, 92) 0%,
    rgb(61, 42, 84) 100%
  );
  padding: 60px 0 80px;
  text-align: center;
  color: #fff;
  position: relative;

  button {
    background: #20c7d4;
    border: none;
    color: #000;
    font-size: 20px;
    font-weight: 700;
    padding: 15px 30px;
    border-radius: 50px;
    margin-top: 10px;
    cursor: pointer;
  }

  ul li:nth-child(1) {
    position: absolute;
    left: 270px;
    top: 100px;
  }

  img {
    max-width: 150px;
    height: auto;
  }

  ul li:nth-child(2) {
    position: absolute;
    right: 270px;
    top: 100px;
  }
  @media screen and (max-width: 991px) {
    img {
      display: none;
    }
  }
`;
export const TicketFinished = styled.div`
  background: linear-gradient(rgb(0, 0, 209) 0%, rgb(255, 255, 2) 100%);
  padding: 50px 10px;
  text-align: center;
  color: #fff;

  .roundArea {
    max-width: 800px;
    margin: auto;
  }
  .ticketFooter button {
    background: #27262c;
    width: 100%;
    border: none;
    color: #20c7d4;
    font-weight: 700;
    font-size: 16px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    padding: 20px;
    cursor: pointer;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }
  }
  .ticket-footer-details {
    background: #08060b;
    color: #fff;
    padding: 30px 50px 40px;
    text-align: left;
  }

  .ticket-footer-details ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 30px;
  }

  .ticket-footer-details ul li strong {
    color: #9a6bff;
  }

  .ticket-footer-details ul li p {
    font-weight: 700;
    margin: 6px 0;
    font-size: 18px;
  }

  .ticket-footer-details ul {
    margin-top: 30px;
  }

  .ticket-footer-details ul li span {
    color: #b8add3;
    font-size: 14px;
  }

  .ticket-footer-details ul li p span {
    color: #fff;
    font-size: 18px;
  }
  .red-burn {
    color: #ee4b9e !important;
  }
  .ticketFooter button {
    background: #27262c;
    width: 100%;
    border: none;
    color: #20c7d4;
    font-weight: 700;
    font-size: 16px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    padding: 20px;
    cursor: pointer;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }
  }

  .sc-jxgYAQ.dewzFT h2 {
    font-size: 40px;
  }

  .ticketFinishedArea {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
  }

  .ticketFinishedArea button {
    background: #372f47;
    border: none;
    color: #b8add3;
    font-weight: 700;
    padding: 10px 20px;
    border-radius: 40px;
    text-transform: capitalize;
    cursor: pointer;
  }
  .ticketFinishedArea button.active {
    background: #8a81a1;
    color: #27262c;
  }
  .round {
    background: #27262c;
    padding: 2px;
    border-radius: 20px;
  }

  .round h2 {
    margin: 0;
    display: flex;
    padding: 20px 40px;
    gap: 20px;
    font-size: 28px !important;
    align-items: center;
  }

  .round h2 span {
    background: #372f47;
    font-size: 16px;
    padding: 10px 20px;
    border-radius: 50px;
    font-weight: 300;
  }

  .round p {
    text-align: left;
    padding: 0 40px;
    margin: 0;
    font-size: 14px;
  }

  .round-number {
    display: grid;
    grid-template-columns: 1fr 2fr;
    padding: 30px 40px;
    border-top: 1px solid #383242;
    margin: 30px 0 0;
    gap: 50px;
    justify-content: space-between;
    border-bottom: 1px solid #383242;
  }

  .round-number ul {
    display: flex;
    gap: 5px;
    justify-content: end;
  }

  .round-number h3 {
    display: flex;
    margin: 0;
    font-size: 26px;
  }

  .round-number ul li img {
    width: 60px;
  }
  .ticket-footer-details ul li p {
    padding: 0 !important;
  }
  .round-history h2 {
    background: linear-gradient(166.77deg, #3b4155, #3a3045);
    padding: 22px 40px;
    text-align: left;
    border-radius: 20px;
    margin: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .round-history-body {
    background: #27262c;
    border-bottom: 1px solid #383242;
    padding: 60px 10px;
  }

  .round-history-body p {
    color: #b2a8cd;
  }

  .round-history-body button {
    background: #20c7d4;
    border: none;
    font-weight: 700;
    padding: 12px 30px;
    font-size: 16px;
    border-radius: 10px;
  }

  .round-footer {
    background: #27262c;
    padding: 12px;
    font-size: 12px;
    color: #b8add3;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  @media screen and (max-width: 991px) {
    .round-number {
      grid-template-columns: 1fr !important;
    }
    .round-number ul {
      display: inline-block;
    }
    .round p {
      padding: 0;
      text-align: center;
    }
    .ticket-footer-details ul {
      grid-template-columns: 1fr;
    }
  }
`;

export const PlayArea = styled.div`
  background: #08060b;
  padding: 100px 50px;
  color: #fff;

  h2 {
    color: #9a6bff;
    text-align: center;
    font-size: 40px;
    margin: 0;
  }

  p {
    text-align: center;
    max-width: 840px;
    margin: 20px auto 30px;
  }

  ul li {
    background: #27262c;
    border-radius: 20px;
    padding: 30px;
    border: 1px solid #383242;
  }

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
  }

  ul li span {
    text-align: right;
    display: block;
    font-weight: 700;
    font-size: 12px;
  }

  ul li h2 {
    text-align: left;
    font-size: 18px;
    margin-top: 20px;
  }

  ul li p {
    text-align: left;
    color: #b8add3;
    font-size: 14px;
  }
  .playDetails {
    display: grid;
    grid-template-columns: 2fr 1fr;
    margin: 40px 0;
    border-top: 1px solid #383242;
    padding-top: 40px;
    gap: 40px;
  }

  .playDetailsRight img {
    max-width: 100%;
    height: auto;
  }

  .playDetailsLeft h2 {
    text-align: left;
    font-size: 22px;
  }

  .playDetailsLeft h3 {
    text-align: left;
    font-size: 18px;
  }

  .playDetailsLeft p {
    text-align: left;
    color: #a79ebf;
  }

  .playDetailsLeft ul {
    display: unset;
  }

  .playDetailsLeft ul li {
    background: unset;
    border: unset;
    padding: unset;
    border-radius: unset;
    list-style: disc;
    margin: 20px 20px;
    color: #a79ebf;
  }
  @media screen and (max-width: 991px) {
    padding: 100px 10px;
    ul {
      grid-template-columns: 1fr;
    }
    .playDetails {
      grid-template-columns: 1fr;
    }
  }
`;

export const BuyTicket = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: #ffffff87;

  .buyTicketInner {
    max-width: 350px;
    background: #27262c;
    border-radius: 20px;
    color: #fff;
  }

  .buyTicketInner h2 {
    background: linear-gradient(166.77deg, #3b4155, #3a3045);
    margin: 0;
    padding: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    font-size: 18px;
    margin-bottom: 20px;
  }

  .buyTicketInner h2 svg {
    cursor: pointer;
    color: #1fc7d4;
    height: auto;
    width: 20px;
  }

  .buyTicketInner h3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    color: #b8add2;
    font-weight: 300;
    font-size: 14px;
    margin: 0;
  }

  .buyTicketInner h3 img {
    height: auto;
    max-width: 30px;
  }

  .buyTicketInner h3 strong {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  .buyTicketInner h4 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 20px;
    color: #b8add2;
    font-weight: 300;
    font-size: 16px;
    margin: 0;
  }

  .buyTicketInner h4 strong {
    color: #fff;
  }

  .buyBmax {
    background: #372f47;
    margin: 10px 20px;
    padding: 20px;
    text-align: right;
    border-radius: 20px;
  }

  .buyBmax input {
    background: transparent;
    border: none;
    text-align: right;
    color: #fff;
    font-size: 14px;
  }

  .buyBmax p {
    margin: 5px 0;
    font-size: 12px;
    color: #b3a8cd;
  }

  .buyTicketInner button {
    background: #1fc7d4;
    border: none;
    width: -webkit-fill-available;
    padding: 12px;
    margin: 0 20px;
    border-radius: 20px;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
  }

  .buyTicketInner h5 {
    color: #b8add2;
    font-weight: 400;
    padding: 20px;
    margin: 0;
    font-size: 12px;
    line-height: 1.5;
    text-align: center;
  }
`;


export const ConnectWallets = styled.span`
  button {
    background: #1fc7d4 !important;
    color: #000 !important;
  }
`;


export const NumberContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 0;
  width: 100%;
  max-height: 170px;
  overflow-y: scroll;
  scroll-snap-type: proximity;
  .input {
    width: 230px;
    height: 30px;
    align-self: center;
    margin-bottom: 10px;
    padding-left: 15px;
    font-size: 1.2rem;
    border: #000 1px solid;
    letter-spacing: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;


export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 8px;
  padding: 10px;
  height: 55px;

  border: 1px solid #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  h2 {
    font-family: "Ropa Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 19px;
    color: #000000;
  }
  h3 {
    padding: 5px;
  }
  h4 {
    font-size: 20px;
  }
  p {
    display: flex;
    align-items: center;
    background: #ffffff;
    border: 1px solid #8e8e8e;
    border-radius: 5px;
    font-family: "Ropa Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 26px;
    color: #000000;
    padding: 0 10px;
    height: 40px;
    margin-left: 5px;
    span {
      font-size: 12px;
      margin: 0;
      padding: 0;
      position: relative;
      top: -12px;
      line-height: 18px;
      font-weight: 400;
    }
  }
`;

export const Number = styled.h3`
  background-color: #6fbafe;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 28px;
  width: 28px;
  border: 1px solid #000000;
  box-shadow: inset -2px -2px 3px rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  margin: 0 2px 15px;
  color: white;
  -webkit-text-stroke: 0.1px black;
  font-family: "Ropa Sans";
  font-size: 25px;
  font-weight: ;
  @media screen and (max-width: 768px) {
    margin: 20px 2px 15px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 5px;
  margin: 0px 40px 20px 40px;
  button {
    font-family: "Ropa Sans";
    font-style: normal;

    font-weight: 400;
    font-size: 24px;
    line-height: 26px;

    display: flex;
    align-items: center;

    color: #000000;
    padding: 5px 20px;
  }
`;
