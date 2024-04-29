import Chart from "react-apexcharts";
import numeral from "numeral";
import styled from "styled-components";
import { IStatesData, IVideoRised } from "../../store/accountStateAnalytics";

export const ApexChart = ({
  states,
  videoRised,
}: {
  states: IStatesData[];
  videoRised: IVideoRised[];
}) => {
  function NumberFormatter(number: number): string {
    const formattedNumber = numeral(number).format("0.00a").toUpperCase();
    return formattedNumber;
  }
  const subscribers = states.map((state) => state.subscribers);
  const clips = states.map((state) => state.clips);
  const likes = states.map((state) => state.likes);
  const date = states.map((state) => state.parseDate);
  const formattedDates = date.map((d) => new Date(d).getTime());

  interface ChartOptions {
    chart: {
      theme: {
        mode: string;
      };
      id: string;
      background: string;
      width: string;
      toolbar: {
        show: boolean; // Show the toolbar
        tools: {
          download: boolean; // Hide the download button
          selection: boolean; // Hide the selection button
          zoom: boolean; // Hide the zoom buttons
          zoomin: boolean; // Hide the zoom-in button
          zoomout: boolean; // Hide the zoom-out button
          pan: boolean; // Hide the panning button
          reset: boolean; // Hide the reset zoom button
          customIcons: []; // Hide any custom icons if present
        };
      };
    };
    tooltip: {
      enabled: boolean;
      theme: string;
    };
    xaxis: {
      title: {
        text: string;
      };
      type: "datetime" | "category";
      categories: string[];
      tickAmount?: number;
      labels: {
        style: {
          colors: string;
          fontSize: string;
          fontWeight: string;
          fontFamily: string;
        };
        datetimeUTC: true;
      };
      axisBorder: {
        show: boolean;
      };
      axisTicks: {
        show: boolean;
      };
    };
    yaxis: {
      title: {
        text: string;
        style: {
          fontSize: string;
          fontWeight: string;
          fontFamily: string;
          color: string;
        };
      };
      labels: {
        formatter: (v: number) => string;
        style: {
          colors: string;
          fontSize: string;
          fontWeight: string;
          fontFamily: string;
        };
      };
    };
    dataLabels: {
      enabled: boolean;
    };
    fill: {
      type: string;
      gradient: {
        shadeIntensity: number;
        opacityFrom: number;
        opacityTo: number;
        stops: number[];
      };
    };
    colors: string[];
    grid: {
      show: boolean;
      lines: {
        show: boolean;
      };
    };
    stroke: {
      width: number[];
      curve: "smooth";
    };
    legend: {
      show: boolean;
      showFor: boolean[];
      showForSingleSeries: boolean;
      showForNullSeries: boolean;
      showForZeroSeries: boolean;
      position: "bottom";
      horizontalAlign: "right";
      floating: boolean;
      fontSize: string;
      fontFamily: string;
      fontWeight: number;
      offsetX: number;
      offsetY: number;
      labels: {
        colors: any;
        useSeriesColors: boolean;
      };
      markers: {
        width: number;
        height: number;
        strokeWidth: number;
        strokeColor: string;
        fillColors: any;
        radius: number;
        customHTML: any;
        onClick: any;
        offsetX: number;
        offsetY: number;
      };
      itemMargin: {
        horizontal: number;
        vertical: number;
      };
      onItemClick: {
        toggleDataSeries: boolean;
      };
      onItemHover: {
        highlightDataSeries: boolean;
      };
    };
    annotations?: {
      xaxis?: {
        x: number;
        y: number;
        strokeDashArray: number;
        borderColor: string;
        label: {
          click: () => void;
          borderColor: string;
          position: "top" | "center";
          style: {
            color: string;
            background: string;
            cursor: string;
            cssClass: string;
          };
          text: string;
        };
      }[];
      points?: {
        x: number;
        y: number;
        marker: {
          size: number;
        };
        image: {
          path: string;
          width: number;
          height: number;
          style: {
            cssClass: string;
          };
        };
      }[];
    };
  }

  const options: ChartOptions = {
    chart: {
      theme: {
        mode: "dark",
      },
      id: "basic-bar",
      background: "rgb(13, 13, 14)",
      width: "100%",
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: true,
          customIcons: [],
        },
      },
    },
    tooltip: {
      enabled: true,
      theme: "dark",
    },
    xaxis: {
      title: {
        text: "Date",
      },
      type: "datetime",
      categories: date,
      tickAmount: undefined,
      labels: {
        style: {
          colors: "#999",
          fontSize: "14px",
          fontWeight: "bold",
          fontFamily: "Helvetica",
        },
        datetimeUTC: true,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        text: "Active users",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          fontFamily: "Helvetica",
          color: "#263238",
        },
      },
      labels: {
        formatter: (value: number) => {
          return NumberFormatter(value);
        },
        style: {
          colors: "#999",
          fontSize: "14px",
          fontWeight: "bold",
          fontFamily: "Helvetica",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
    colors: ["#c2fc46", "rgba(0, 135, 233, 1)", "rgba(199, 4, 254, 1)"],
    grid: {
      show: false,
      lines: {
        show: false,
      },
    },
    stroke: {
      width: [3, 3, 3],
      curve: "smooth",
    },
    legend: {
      show: true,
      showFor: [true, false, false],
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: "bottom",
      horizontalAlign: "right",
      floating: false,
      fontSize: "14px",
      fontFamily: "Helvetica, Arial",
      fontWeight: 400,
      offsetX: 0,
      offsetY: 0,
      labels: {
        colors: undefined,
        useSeriesColors: true,
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: "#fff",
        fillColors: undefined,
        radius: 12,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 0,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 10,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
  };
  if (videoRised.length > 0) {
    const { playCount, parseDate: videoDate, coverUrl, likes, subscribers } = videoRised[0];
    options.annotations = {
      xaxis: [
        {
          x: new Date(videoDate).getTime(),
          y: subscribers - 700,
          strokeDashArray: 0,
          borderColor: "#fff",
          label: {
            click: function () {
              // Your onClick function here
              //console.log("Clicked");
            },
            borderColor: "#999",
            position: "center",
            style: {
              color: "#fff",
              background: "#ffffff2b",
              cursor: "pointer",
              cssClass: "apexcharts-xaxis-annotation-label",
            },
            text: `${NumberFormatter(playCount)} views`,
          },
        },
      ],
      points: [
        {
          x: new Date(videoDate).getTime(),
          y: subscribers,
          marker: {
            size: 0,
          },
          image: {
            path: coverUrl,
            width: 70,
            height: 100,
            style: {
              cssClass: "image-with-border",
            },
          },
        },
      ],
    };
  }

  const series = [
    {
      name: "followers",
      data: subscribers,
    },
    {
      name: "videos",
      data: clips,
    },
    {
      name: "likes",
      data: likes,
    },
  ];

  return (
    <WrapChart>
      <Chart type="line" height={500} series={series} options={options} />
    </WrapChart>
  );
};

const StyledButton = styled.button`
  background: #fff;
  color: #222;
  border: 1px solid #e7e7e7;
  border-bottom: 2px solid #ddd;
  border-radius: 2px;
  padding: 4px 17px;
`;

const Toolbar = styled.div`
  display: flex;
  gap: 1rem;
  position: absolute;
  bottom: 25px;
`;
const WrapChart = styled.div`
  position: relative;
`;
