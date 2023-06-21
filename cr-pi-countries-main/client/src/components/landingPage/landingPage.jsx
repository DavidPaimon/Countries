import { Link } from 'react-router-dom';
import style from './landingPage.module.css';

const LandingPage = () => {
  return (
    <div className={style.background}>
      <div className={style.leboton}>
        <h1 className={style.paimon}>PAIMON AIR LINES</h1>
        <Link to="/home" className={style.link}>
          <div>
            <button className={style.lpbtn}>
              <span className={style.start}>¡LET'S GO!</span>
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
