import { useMediaQuery } from "react-responsive";

import { Button as ButtonModal } from "@mui/material";

import { useReservationCancelContext } from "../../../contexts/ReservationsContext/ReservationCancelAndList";
import { usePetContext } from "../../../contexts/PetsContext";
import { UseUserReviewContext } from "../../../contexts/UserReviewContext";
import { Button } from "../../Button/style";
import DeleteModal from "../../DeleteModal";
import { ContainerReservations } from "../styles";

const Reservations = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 430px)" });
  const { handleOpenDeleteModal } = usePetContext();
  const { openReviewModal } = UseUserReviewContext();

  const { reservations, cancelReservation, allRoomTypes } =
    useReservationCancelContext();

  return (
    <ContainerReservations>
      {reservations?.map((reservation) => (
        <div key={reservation.id} className="card--reservations">
          <div className="card--title">
            {
              allRoomTypes?.filter(
                (elem) => elem.id === reservation.pets_rooms[0].rooms_type_id,
              )[0]?.title
            }
          </div>
          <div className="card--image">
            <img
              src={
                allRoomTypes?.filter(
                  (elem) => elem.id === reservation.pets_rooms[0].rooms_type_id,
                )[0]?.image
              }
              alt={
                allRoomTypes?.filter(
                  (elem) => elem.id === reservation.pets_rooms[0].rooms_type_id,
                )[0]?.title
              }
            />
          </div>
          <div className="card--info">
            <p>Data:</p>
            <span>Out 27-30, 2022</span>
          </div>
          <div className="card--info">
            <p>Status:</p>
            <span>{reservation.status}</span>
          </div>
          <div className="card--button">
            {reservation.status === "reserved" ? (
              <Button
                backgroundColor="#AAA8A8"
                color="rgba(var(--white), 1)"
                height={isMobile ? "45px" : "50px"}
                width={isMobile ? "150px" : "180px"}
                fontSize={isMobile ? "15px" : "18px"}
                fontWeight="500"
                borderRadius="10px"
                colorHover="#757373"
                // onClick={() => cancelReservation(reservation.id)}
                onClick={handleOpenDeleteModal}
              >
                Quer cancelar?
              </Button>
            ) : (
              <Button
                backgroundColor="#FF8947"
                color="rgba(var(--white), 1)"
                height={isMobile ? "45px" : "50px"}
                width={isMobile ? "150px" : "180px"}
                fontSize={isMobile ? "15px" : "18px"}
                fontWeight="500"
                borderRadius="10px"
                colorHover="#c0581f"
                onClick={() => openReviewModal(reservation.id)}
              >
                Nos avalie!
              </Button>
            )}
          </div>
        </div>
      ))}
      <DeleteModal
        title="Cancelar a reserva"
        description="Tem certeza de que deseja cancelar a reserva?"
        btn1="Voltar"
      >
        <ButtonModal variant="contained" color="error">
          Cancelar
        </ButtonModal>
      </DeleteModal>
    </ContainerReservations>
  );
};

export default Reservations;
