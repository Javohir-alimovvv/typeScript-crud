import { ChangeEvent, useState } from 'react';
import './App.css'

interface LoginForm {
  title: string;
  price: string;
  url: string;
}

const initialState: LoginForm = {
  title: "",
  price: "",
  url: ""
}
function App() {
  const [date, setDate] = useState<LoginForm>(initialState)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target
    setDate((prev: LoginForm): LoginForm => ({...prev, [name]: value}))
  }
  console.log(date);


  return (
    <>

      <div className='header__big'>
        <div className='container'>
          <header className='header'>
            <h3 className='header__logo'>Logoo</h3>
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
        <form className='form' action="">
          <input value={date.title} onChange={handleChange} name='title' className='form__input' type="text" placeholder='Enter title' />
          <input value={date.price} onChange={handleChange} name='price' className='form__input' type="text" placeholder='Enter price' />
          <input value={date.url} onChange={handleChange} name='url' className='form__input' type="text" placeholder='Enter url' />
          <button className='form__btn'>Submit</button>
        </form>
      </div>

      <div className='container'>
        <div className='menu'>
          <div className='menu__top'>
            <h2 className='menu__top__left__text'>Menu</h2>
            <h3 className='menu__top__right__text'>Buyurma</h3>
          </div>
          <div className='menu__map'>
            <div className='menu__map__card'>
              <div className='menu__map__card__box'>
                <img className='menu__map__card__box__img' src="" alt="" />
              </div>
              <div className='menu__map__card__group__center'>
                <h3 className='menu__map__card__group__center__title'>tit</h3>
                <p className='menu__map__card__group__center__price'>pr</p>
              </div>
              <p className='menu__map__card__desc'>des</p>
              <div className='menu__map__card__group__bottom'>
                <h3 className='menu__map__card__group__bottom__ulcham'>bold</h3>
                <button className='menu__map__card__group__bottom__add'>Add</button>
              </div>
              <div className='menu__map__card__btn__gr'>
                <button className='menu__map__card__btn__gr__del'>Delete</button>
                <button className='menu__map__card__btn__gr__ed'>Edit</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
    // {
    //   "title": "lavash",
    //   "description": "Italia Lavashi",
    //   "price": 31,
    //   "url": "https://www.restoran-shafran.uz/image/cache/catalog/product/lavash-v-tandire-1-750x500.jpg",
    //   "size": "kotta",
    //   "id": "1"
    // },
  )
}

export default App
