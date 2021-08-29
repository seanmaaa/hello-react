import CardInfo from "./CardInfo";

function CardInfoListView({ cardList = [], handleOnUpdate, handleOnDelete }) {
    return (
        <div>
            {cardList.map(card => (<CardInfo key={card.id} info={card} handleOnUpdate={handleOnUpdate} handleOnDelete={handleOnDelete} />))}
        </div>
    );
}

export default CardInfoListView
