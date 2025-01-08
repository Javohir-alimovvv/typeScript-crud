import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import './App.css';
import { Foods, LoginForm } from './types';
import axios from 'axios';

const initialState: LoginForm = {
  title: "",
  price: "",
  url: ""
};

function App() {
  const [formData, setFormData] = useState<LoginForm>(initialState);
  const [foodList, setFoodList] = useState<Foods[] | null>(null);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    axios.get('https://6731c7fa7aaf2a9aff120907.mockapi.io/foods')
      .then(res => setFoodList(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editId) {
      try {
        await axios.put(`https://6731c7fa7aaf2a9aff120907.mockapi.io/foods/${editId}`, formData);
        setFoodList(prev => prev?.map(item => item.id === editId ? { ...item, ...formData } : item) || null);
        setEditId(null);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const res = await axios.post('https://6731c7fa7aaf2a9aff120907.mockapi.io/foods', formData);
        setFoodList(prev => (prev ? [...prev, res.data] : [res.data]));
      } catch (err) {
        console.error(err);
      }
    }

    setFormData(initialState);
  };

  const handleEdit = (id: string) => {
    const selectedFood = foodList?.find(item => item.id === id);
    if (selectedFood) {
      setFormData({
        title: selectedFood.title,
        price: selectedFood.price.toString(),
        url: selectedFood.url
      });
      setEditId(id);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://6731c7fa7aaf2a9aff120907.mockapi.io/foods/${id}`);
      setFoodList(prev => prev?.filter(item => item.id !== id) || null);
    } catch (err) {
      console.error(err);
    }
  };

  const foodsItem: JSX.Element[] | undefined = foodList?.map((item: Foods): JSX.Element => (
    <div key={item.id} className='menu__map__card'>
      <div className='menu__map__card__box'>
        <img className='menu__map__card__box__img' src={item.url} alt={item.title} />
      </div>
      <div className='menu__map__card__group__center'>
        <h3 className='menu__map__card__group__center__title'>{item.title}</h3>
        <p className='menu__map__card__group__center__price'>{item.price}</p>
      </div>
      <p className='menu__map__card__desc'>{item.description}</p>
      <div className='menu__map__card__group__bottom'>
        <h3 className='menu__map__card__group__bottom__ulcham'>{item.size}</h3>
      </div>
      <div className='menu__map__card__btn__gr'>
        <button className='menu__map__card__btn__gr__del' onClick={() => handleDelete(item.id)}>Delete</button>
        <button className='menu__map__card__btn__gr__ed' onClick={() => handleEdit(item.id)}>Edit</button>
      </div>
    </div>
  ));

  return (
    <>
      <div className='header__big'>
        <div className='container'>
          <header className='header'>
            <h3 className='header__logo'>CRUD</h3>
            <ul className='header__content'>
              <li className='header__content__item'><span>Home</span></li>
              <li className='header__content__item'><span>About</span></li>
              <li className='header__content__item'><span>Contact</span></li>
              <li className='header__content__item'><span>Log In</span></li>
            </ul>
          </header>
        </div>
      </div>

      <div className='container'>
        <form onSubmit={handleSubmit} className='form'>
          <input value={formData.title} onChange={handleChange} name='title' className='form__input' type='text' placeholder='Enter title' />
          <input value={formData.price} onChange={handleChange} name='price' className='form__input' type='text' placeholder='Enter price' />
          <input value={formData.url} onChange={handleChange} name='url' className='form__input' type='url' placeholder='Enter url' />
          <button className='form__btn' type='submit'>{editId ? 'Update' : 'Submit'}</button>
        </form>
      </div>

      <div className='container'>
        <div className='menu'>
          <div className='menu__top'>
            <h2 className='menu__top__left__text'>Menu</h2>
            <h3 className='menu__top__right__text'>Buyurma</h3>
          </div>

          <div className='menu__map'>
            {foodsItem}
          </div>
        </div>
      </div>
      {/* "{
        "title": "lavash",
      "description": "Italia Lavashi",
      "price": 31,
      "url": "https://www.restoran-shafran.uz/image/cache/catalog/product/lavash-v-tandire-1-750x500.jpg",
      "size": "kotta",
      "id": "1"
      }," */}
    </>
  );
}

export default App;
