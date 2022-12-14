import { Link } from 'react-router-dom';
import style from './CardMainLocation.module.css';

export const CardMainLocation = ({ loc }) => {
  return (
    <Link to={`locations/${loc._id}`} className={style.locWrap}>
      <img
        className={style.locImg}
        src={loc.linkImage.split('|')[0]}
        alt='123'
        width={278}
        height={330}
      />
      <p className={style.locTitle}>{loc.title}</p>
    </Link>
  );
};
