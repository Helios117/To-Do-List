import React, { useState } from 'react';
import ListCard from './components/ListCard';

function App() {
  const [lists, setLists] = useState([]);
  const [listName, setListName] = useState('');

  const addNewList = () => {
    if (listName.trim() !== ''){
      setLists([...lists, {id: Date.now(), name: listName, tasks: [], input: ''}]);
      setListName('');
    }
  };

  const deleteList = (listId) => {
    setLists( lists.filter(list => list.id !== listId) )
  }

  return (
    <div className='h-full min-h-[100vh] bg-gradient-to-b from-[#a18cd1] to-[#fbc2eb]'>
      <div className='flex flex-col items-center p-2 gap-2'>
        <p className='text-3xl font-bold'>To-Do Lists</p>
        <div className='flex justify-center gap-2 border-2 border-black rounded-md p-2'>
          <input
              type="text"
              value={listName}
              onChange={e => setListName(e.target.value)}
              onKeyDown={e => {if(e.key === 'Enter'){addNewList();}}}
              placeholder="New list name"
              className='border-r-2 border-black'
            />
          <button onClick={addNewList} className='hover:scale-105  active:text-gray-500 transition duration-200'>Add List</button>
        </div>

        <div className="lists-container flex flex-wrap w-full justify-around gap-y-4">
          {lists.map(list => (
            <div key={list.id} className='flex flex-col justify-center gap-2'>
              <ListCard name={list.name}/>
              <button onClick={() => deleteList(list.id)} className='bg-gray-300 border-2 border-black rounded-md hover:scale-105 transition duration-200'>Delete List</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
