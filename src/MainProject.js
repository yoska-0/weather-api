import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/ar";
import { useTranslation } from "react-i18next";

let cancelAxios = null;

export default function MainProject() {
  const { t, i18n } = useTranslation();
  const [timeAndDate, setTimeAndDate] = useState();
  const [temp, setTemp] = useState({
    mainTemp: 0,
    tempMax: 0,
    tempMin: 0,
    description: "",
    icon: "",
  });
  const [lang, setLang] = useState("ar");

  const direction = lang === "ar" ? "rtl" : "ltr";

  function handelChangeLang() {
    if (lang === "ar") {
      setLang(() => "en");
      i18n.changeLanguage("en");
    } else {
      setLang(() => "ar");
      i18n.changeLanguage("ar");
    }
  }

  useEffect(() => {
    moment.locale(lang);
    setTimeAndDate(() => moment().format("MMMM Do YYYY, h:mm:ss a"));
  }, [lang]);

  useEffect(() => {
    i18n.changeLanguage(lang);
    setTimeAndDate(() => moment().format("MMMM Do YYYY, h:mm:ss a"));
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=30.03&lon=31.23&appid=d9f5769558609fef5a4e18fe0f370f35",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then((respon) => {
        console.log(respon);
        setTemp({
          mainTemp: convertToCelsius(respon.data.main.temp),
          tempMax: convertToCelsius(respon.data.main.temp_max),
          tempMin: convertToCelsius(respon.data.main.temp_min),
          description: respon.data.weather[0].description,
          icon: ` https://openweathermap.org/img/wn/${respon.data.weather[0].icon}@2x.png`,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      if (cancelAxios) cancelAxios();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function convertToCelsius(temp) {
    return Math.round(temp - 272.15);
  }

  return (
    <Container
      maxWidth="sm"
      style={{
        padding: "15px",
      }}
    >
      <div
        style={{
          width: "100%",
          background: "#9f9f9f6e",
          borderRadius: "10px",
          padding: "15px",
          boxShadow: "0px 11px 7px #0000003d",
        }}
      >
        {/* header */}
        <div
          dir={direction}
          style={{
            display: "flex",
            alignItems: "end",
            color: "white",
          }}
        >
          <Typography variant="h1">{t("cario")}</Typography>
          <Typography
            variant="h5"
            style={{
              fontWeight: "100",
              color: "#f2f2f2c7",
            }}
          >
            {timeAndDate}
          </Typography>
        </div>
        {/* ==header== */}
        <hr />
        {/* body contetn */}
        <div
          dir={direction}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
          }}
        >
          <div>
            <div style={{ display: "flex", marginBottom: "5px" }}>
              <Typography variant="h1">{temp.mainTemp}</Typography>
              <img src={temp.icon} alt="" />
            </div>
            <Typography
              dir={direction}
              variant="h5"
              style={{ marginBottom: "5px", textAlign: "start" }}
            >
              {t(temp.description)}
            </Typography>
            {/* timpriter */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">
                {t("min") + " " + temp.tempMin}
              </Typography>
              <div
                style={{
                  backgroundColor: "white",
                  height: "20px",
                  width: "2px",
                  margin: "0 10px",
                }}
              ></div>
              <Typography variant="h6">
                {t("max") + " " + temp.tempMax}
              </Typography>
            </div>
            {/* ==timpriter== */}
          </div>
          <div>
            <CloudIcon style={{ fontSize: "200px" }} />
          </div>
        </div>
        {/* ==body contetn== */}
      </div>
      <div
        style={{
          float: direction === "rtl" ? "left" : "right",
          marginTop: "15px",
        }}
      >
        <Button variant="text" onClick={handelChangeLang}>
          {lang === "ar" ? "English" : "عربي"}
        </Button>
      </div>
    </Container>
  );
}
