import { Fragment, useState } from 'react';
import './App.css';
import CardForm from './CardForm';
import CardInfoListView from './CardInfoListView';

function App() {
  const [cardId, setCardId] = useState(0)
  const [cardList, setCardList] = useState([])

  const handleOnCreate = (cardInfo) => {
    setCardList(cardList.concat({ id: cardId, name: cardInfo.name, description: cardInfo.description }))
    setCardId(c => c + 1)
  }

  const handleOnUpdate = (modifiedCard) => {
    setCardList(cardList.map(card => (card.id === modifiedCard.id) ? modifiedCard : card))
  }

  const handleOnDelete = (cardId) => {
    setCardList(cardList.filter(card => card.id !== cardId))
  }

  return (
    <Fragment>
      <h1>React Array Example</h1>
      <CardForm onCreate={(cardInfo) => handleOnCreate(cardInfo)} />
      <CardInfoListView cardList={cardList} handleOnUpdate={handleOnUpdate} handleOnDelete={handleOnDelete} />
    </Fragment>
  );
}

export default App;
