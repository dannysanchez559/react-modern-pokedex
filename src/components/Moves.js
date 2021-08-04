import React from "react";
import { Bar } from "react-chartjs-2";

const Moves = ({ moveSet }) => {
  // function for finding English flavor text; returns a string
  const getEngFlavorText = (texts) => {
    for (let i = 0; i < texts.length; i += 1) {
      const textObj = texts[i];
      if (textObj.language.name === "en") {
        return textObj.flavor_text;
      }
    }
  };

  const moveInfo = moveSet.map((moveObj) => {
    const { accuracy, name, power, pp, flavor_text_entries, type } = moveObj;
    // call function to loop through flavor_text_entries and find "en"
    return (
      <>
        <div className="movesGraphContainer">
          <Bar
            className="movesGraph"
            data={{
              labels: ["Power", "Accuracy", "PP"],
              datasets: [
                {
                  data: [power, accuracy, pp],
                  backgroundColor: ["#CE2121", "#419516", "#4986CF"],
                  hoverBackgroundColor: ["#CE2121", "#419516", "#4986CF"],
                  borderRadius: 50,
                  borderSkipped: false,
                  borderWidth: 1,
                  barThickness: 8,
                  minBarLength: 5,
                },
              ],
            }}
            height={100}
            width={100}
            options={{
              layout: {
                padding: 5,
              },
              indexAxis: "y",
              elements: {
                bar: {
                  borderWidth: 2,
                },
              },
              responsive: true,
              scales: {
                x: {
                  grid: {
                    display: false,
                    drawBorder: false,
                  },
                  ticks: {
                    display: false,
                    beginAtZero: true,
                  },
                },
                y: {
                  grid: {
                    display: false,
                    drawBorder: false,
                  },
                },
              },
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  display: true,
                  text: [
                    name.toUpperCase(),
                    // getEngFlavorText(flavor_text_entries),
                  ],
                },
                subtitle: {
                  display: true,
                  text: getEngFlavorText(flavor_text_entries),
                },
                tooltip: {
                  enabled: true,
                  backgroundColor: "rgb(0,0,0,0.6",
                  titleColor: "#fff",
                  bodyColor: "#fff",
                },
              },
            }}
          />
          {/* <ul key={name}>
        <li>{name.toUpperCase()}</li>
        <li>{type.name}</li>
        <li>{getEngFlavorText(flavor_text_entries)}</li>
        <li>Accuracy: {accuracy}</li>
        <li>Power: {power}</li>
        <li>PP: {pp}</li>
      </ul> */}
        </div>
      </>
    );
  });
  return <div className="moves-panel">{moveInfo}</div>;
};

export default Moves;
