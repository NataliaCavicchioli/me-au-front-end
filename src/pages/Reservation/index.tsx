import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa";
import { RiCloseCircleFill } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Dialog } from "@mui/material";
import * as yup from "yup";

import { ReactComponent as Ball } from "../../assets/Icons/ball.svg";
import { ReactComponent as Bone } from "../../assets/Icons/bone.svg";
import catToyPng from "../../assets/Icons/catToy.png";
import dogToyPng from "../../assets/Icons/dogToy.png";
import Calendar from "../../components/Calendar";
import CartModal from "../../components/CartModal";
import { useReservationContext } from "../../contexts/ReservationsContext/ReservationCreateContext";
import { useUserContext } from "../../contexts/UserContext";
import { IRoom } from "../../interfaces/Reservations";
import { StyledRoomSection, DialogInner } from "./styles";

interface IReservationProps {
  room: IRoom;
}

interface IFormDates {
  checkin: string;
  checkout: string;
}

const Reservation = ({ room }: IReservationProps) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isCatRoom = room.tag === "cats";
  const {
    user,
    openFormLogin,
    handleOpenCartModal,
    setIsReservationBtnPressed,
  } = useUserContext();
  const { petsAmount, setPetsAmount } = useReservationContext();

  const [openTooltip, setOpenTooltip] = useState(false);
  const checkLoginAndOpenModal = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsReservationBtnPressed(true);
    // Verificar se tem data e checkin selecionados --- pegar o contexto dessa data e checkin ( não consegui fazer form yup nesse calendar)
    if (user) {
      handleOpenCartModal();
      return;
    }

    // Caso o usuário não estiver logado
    toast.info("Faça o login para realizar o agendamento!");
    openFormLogin();
  };

  return (
    <>
      <StyledRoomSection>
        <div className="container">
          <div className="row">
            <Link to="/accommodations/all">
              <FaArrowLeft size={42} />
            </Link>
            <div className="roomTitle">{t(`Nome dos quartos.${room.tag}`)}</div>
          </div>

          <div className="main">
            <div className="top">
              {isMobile && (
                <div className="toyImgMobileContainer">
                  <img
                    onClick={() => setOpenTooltip(true)}
                    className="toyImgMobile"
                    src={isCatRoom ? catToyPng : dogToyPng}
                    alt=""
                  />
                </div>
              )}
              <img
                onClick={() => setOpenTooltip(true)}
                className="roomImg"
                src={room.urlImage}
                alt=""
              />
              <form onSubmit={(e) => checkLoginAndOpenModal(e)}>
                <Calendar />
                <TextField
                  label="Quantos pets?"
                  type="number"
                  InputProps={{ style: { width: "280px" } }}
                  value={petsAmount || ""}
                  onChange={(e) => setPetsAmount(+e.target.value)}
                />
                <button className="reservationBtn">
                  {t("Agende agora mesmo!")}
                </button>
              </form>
            </div>
            <div className="bottom">
              <div className="col left">
                <p>
                  {t("Acomoda até")}{" "}
                  {`${room.capacity} ${
                    isCatRoom ? `${t("gatos")}` : `${t("cães")}`
                  }`}
                </p>
                {isCatRoom ? <Ball /> : <Bone />}
              </div>
              <div className="col mid">
                <p>
                  Check-in {t("às")} 07h {t("e")} {"\n"} checkout {t("às")} 17h
                </p>
                {isCatRoom ? <Ball /> : <Bone />}
              </div>
              <div className="col right">
                <p>
                  {t("Incluso")}: {room.includedService}
                </p>
                {isCatRoom ? <Ball /> : <Bone />}
              </div>
            </div>
          </div>
          <div className="toyContainer">
            <img
              className="toyImg"
              src={isCatRoom ? catToyPng : dogToyPng}
              alt=""
            />
          </div>
        </div>
      </StyledRoomSection>
      <CartModal />
      {openTooltip && isMobile && (
        <Dialog open={openTooltip} onClose={() => setOpenTooltip(false)}>
          <DialogInner>
            <div className="closeContainer">
              <RiCloseCircleFill
                onClick={() => setOpenTooltip(false)}
                size="40px"
                color="#ff8947"
                stroke="#ffffff"
              />
            </div>
            <p>
              {t("Acomoda até")}{" "}
              {`${room.capacity} ${
                isCatRoom ? `${t("gatos")}` : `${t("cães")}`
              }`}
            </p>
            {isCatRoom ? <Ball /> : <Bone />}

            <p>
              Check-in {t("às")} 07h {t("e")} {"\n"} checkout {t("às")} 17h
            </p>
            {isCatRoom ? <Ball /> : <Bone />}

            <p>
              {t("Incluso")}: {room.includedService}
            </p>
          </DialogInner>
        </Dialog>
      )}
    </>
  );
};

export default Reservation;
