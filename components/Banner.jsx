import styles from "./Banner.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
export function Banner() {
  return (
    <div>
      <Carousel
        className={styles.container}
        infiniteLoop={true}
        showThumbs={false}
        autoPlay={true}
        showStatus={false}
        showIndicators={false}
      >
        <div className={styles.imgDiv}>
          <img className={styles.img} src="/sliderImg_1.jpg" />
        </div>
        <div>
          <img src="/sliderImg_2.jpg" />
        </div>
        <div>
          <img src="/sliderImg_3.jpg" />
        </div>
        <div>
          <img src="/sliderImg_4.jpg" />
        </div>
      </Carousel>
      <div className={styles.cardContents}>
        <div className={styles.row}>
          <div className={styles.cell}>
            <a href="">
              <div className={styles.card}>
                <img className={styles.img} src="" alt="" />
                <div>
                  <p className={styles.cTitle}>ad1</p>
                  <p className={styles.cCont}>adText</p>
                </div>
              </div>
            </a>
          </div>
          <div className={styles.cell}>
            <a href="">
              <div className={styles.card}>
                <img className={styles.img} src="" alt="" />
                <div>
                  <p className={styles.cTitle}>ad2</p>
                  <p className={styles.cCont}>adText</p>
                </div>
              </div>
            </a>
          </div>
          <div className={styles.cell}>
            <a href="">
              <div className={styles.card}>
                <img className={styles.img} src="" alt="" />
                <div>
                  <p className={styles.cTitle}>ad3</p>
                  <p className={styles.cCont}>adText</p>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.cell}>
            <a href="">
              <div className={styles.card}>
                <img className={styles.img} src="" alt="" />
                <div>
                  <p className={styles.cTitle}>ad4</p>
                  <p className={styles.cCont}>adText</p>
                </div>
              </div>
            </a>
          </div>
          <div className={styles.cell}>
            <a href="">
              <div className={styles.card}>
                <img className={styles.img} src="" alt="" />
                <div>
                  <p className={styles.cTitle}>ad5</p>
                  <p className={styles.cCont}>adText</p>
                </div>
              </div>
            </a>
          </div>
          <div className={styles.cell}>
            <a href="">
              <div className={styles.card}>
                <img className={styles.img} src="" alt="" />
                <div>
                  <p className={styles.cTitle}>ad6</p>
                  <p className={styles.cCont}>adText</p>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.cell}>
            <a href="">
              <div className={styles.card}>
                <img className={styles.img} src="" alt="" />
                <div>
                  <p className={styles.cTitle}>ad7</p>
                  <p className={styles.cCont}>adText</p>
                </div>
              </div>
            </a>
          </div>
          <div className={styles.cell}>
            <a href="">
              <div className={styles.card}>
                <img className={styles.img} src="" alt="" />
                <div>
                  <p className={styles.cTitle}>ad8</p>
                  <p className={styles.cCont}>adText</p>
                </div>
              </div>
            </a>
          </div>
          <div className={styles.cell}>
            <a href="">
              <div className={styles.card}>
                <img className={styles.img} src="" alt="" />
                <div>
                  <p className={styles.cTitle}>ad9</p>
                  <p className={styles.cCont}>adText</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
