import React from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../../Layouts/Layout/Layout';
import { API_URI } from '../../assets/const';
import Slider from '../../components/Slider/Slider';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import style from './LocationFullPage.module.css';
import { Raiting } from '../../components/Raiting/Raiting';
import { ReactComponent as Favorites } from '../../img/Favorites.svg';
import { ReactComponent as Share } from '../../img/Share.svg';
import { fetchEvents } from '../../store/events/eventsAction.js';
import { LocEventsCard } from '../../components/LocEventsCard/LocEventsCard';
import ReactMarkdown from 'react-markdown';
import { clearSearch } from '../../store/search/searchSlice';

export const LocationFullPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allEvents = useSelector((state) => state.events.data);
  const [locationPage, setLocationPage] = React.useState([]);
  const [showFullDescr, setShowFullDescr] = React.useState(false);
  const { id } = useParams();

  React.useEffect(() => {
    if (allEvents.length) return;
    dispatch(fetchEvents());
  }, []);

  React.useEffect(() => {
    const fetchLocationPage = async (page) => {
      const { data } = await axios(`${API_URI}/locations/${page}`);
      setLocationPage(data);
    };
    fetchLocationPage(id);
  }, [id]);

  const locationsEvents = allEvents.filter(
    (obj) => obj.location.id === +locationPage.id,
  );

  const {
    address,
    description,
    fullDescription,
    linkImage,
    title,
    price,
    linkSite,
  } = locationPage;

  const cost = price ? `${price} рублей` : 'бесплатно';

  const images = linkImage
    ? linkImage.split('|').slice(0, 5)
    : [
        'https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns=',
      ];

  const handleShowFullDescr = () => {
    setShowFullDescr(!showFullDescr);
  };

  const handleClickHome = () => {
    navigate('/');
    dispatch(clearSearch());
  };

  return (
    <section className={style.location}>
      <Layout>
        <div className={style.nav}>
          <button className={style.homeBtn} onClick={handleClickHome}>
            <svg
              width='36'
              height='36'
              viewBox='0 2 28 28'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M25.1475 9.52931L14.6475 2.52931C14.4558 2.40146 14.2304 2.33326 14 2.33331C13.7699 2.33349 13.5451 2.40168 13.3537 2.52931L2.85366 9.52931C2.6454 9.66818 2.48733 9.87034 2.40279 10.1059C2.31824 10.3415 2.31172 10.5981 2.38417 10.8377C2.45663 11.0773 2.60422 11.2872 2.80514 11.4365C3.00607 11.5858 3.24968 11.6665 3.49999 11.6666H4.66666V24.5C4.66666 24.8094 4.78957 25.1061 5.00837 25.3249C5.22716 25.5437 5.5239 25.6666 5.83332 25.6666H22.1667C22.4761 25.6666 22.7728 25.5437 22.9916 25.3249C23.2104 25.1061 23.3333 24.8094 23.3333 24.5V11.6666H24.5C24.7505 11.667 24.9945 11.5866 25.1958 11.4375C25.3971 11.2884 25.5451 11.0785 25.6178 10.8388C25.6906 10.5991 25.6842 10.3423 25.5997 10.1065C25.5152 9.87066 25.3571 9.66829 25.1487 9.52931H25.1475ZM21 23.3333H6.99999V9.56665L14 4.89998L21 9.56665V23.3333Z'
                fill='black'
              />
            </svg>
          </button>

          <Link to='/locations' className={style.navText}>
            / Top locations /
          </Link>
          <p className={style.navText}> location</p>
        </div>
        <h4 className={style.title}>{title}</h4>

        <div className={style.wrapper}>
          <div className={style.leftContent}>
            <p className={style.distance}>Расстояние 15,3 км</p>
            <div className={style.sliderWrapper}>
              <Slider items={images} />
            </div>

            <div className={style.enter}>
              <p className={style.date}>График работы: не указан</p>
              <p className={style.censure}>Без возростных ограничений</p>
              <p>
                <span className={style.price}>Цена: </span>
                <span>{cost}</span>
              </p>
            </div>
          </div>

          <div className={style.rightContent}>
            <p className={style.adress}>{address}</p>
            <a
              href={linkSite}
              className={style.source}
              rel='noreferrer'
              target='_blank'
            >
              Источник
            </a>

            <div className={style.description}>
              <ReactMarkdown
                children={description ? description : fullDescription}
              />
            </div>
            {description ? (
              <div className={style.moreInfoWrapper}>
                <button
                  className={style.moreInfo}
                  onClick={handleShowFullDescr}
                >
                  {showFullDescr ? 'Свернуть' : 'Больше информации'}
                </button>
              </div>
            ) : null}
            {showFullDescr && (
              <div className={style.description}>
                <ReactMarkdown children={fullDescription} />
              </div>
            )}
            {locationsEvents.length ? (
              <div className={style.locEvents}>
                <span>События в данной локации</span>
                <div className={style.locEventsWrapper}>
                  {locationsEvents.map((item) => (
                    <LocEventsCard key={item._id} event={item} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </Layout>
    </section>
  );
};
