import { scaleLinear } from 'd3'
import './App.css'
import usvideos from "./cleaned_df_11";
import { AxisLeft, AxisBottom } from "@visx/axis";
import BubbleChart from '@weknow/react-bubble-chart-d3';


function App() {

  const cat_cols = {
    1: '#a18276',
    2: '#f27474',
    10: '#66d7d1',
    15: '#ffb4a2',
    17: '#8e7dbe',
    20: '#a1c084',
    22: '#add7f6',
    23: '#f2d0a9',
    24: '#e5989b',
    25: '#9ac2c9',
    26: '#b3f78b',
    27: '#848586',
    28: '#f4d06f',
    29: '#eec6ca'
  }

  const cat_names = {
    1: 'Film & Animation',
    2: 'Autos & Vehicles',
    10: 'Music',
    15: 'Pets & Animals',
    17: 'Sports',
    19: 'Travel & Events',
    20: 'Gaming',
    22: 'People & Blogs',
    23: 'Comedy',
    24: 'Entertainment',
    25: 'News & Politics',
    26: 'Howto & Style',
    27: 'Education',
    28: 'Science & Technology',
    29: 'Nonprofits & Activism'
  }

  const videos = ["The Weeknd - Save Your Tears (Official Music Video)",
    "Godzilla vs. Kong – Official Trailer",
    "ANUEL AA & @Ozuna  - LOS DIOSES",
    "Selena Gomez - De Una Vez (Official Video)",
    "(여자)아이들((G)I-DLE) - '화(火花)(HWAA)' Official Music Video",
    "Olivia Rodrigo - drivers license (Official Video)",
    "India claim stunning series win, end Australia's Gabba streak | Vodafone Test Series 2020-21",
    "Billie Eilish, ROSALÍA - Lo Vas A Olvidar (Official Music Video)",
    "Camilo - Ropa Cara (Official Video)",
    "Galaxy Unpacked January 2021: Official Replay l Samsung"]

  const sp_ap = 'Apex Legends – Legacy Launch Trailer'
  const sp_ap2 = 'Apex Legends | Stories from the Outlands – “Good as Gold”'

  function get_unique_Column(name) {
    var col = []
    for (var i = 0; i < usvideos.length; i += 1) {
      if (col.includes(usvideos[i][name]) == false) {
        col.push(usvideos[i][name])
      }
    };
    return col;
  }

  function getIndexByValue(col_name, value) {
    var col = []
    for (var i = 0; i < usvideos.length; i += 1) {
      if (usvideos[i][col_name] == value) {
        col.push(i)
      }
    };
    return col;
  }

  const video_inds = []
  videos.map((video, i) => {
    video_inds[i] = getIndexByValue('title', video)
  })

  const sp_ap_inds = getIndexByValue('title', sp_ap)
  const sp_ap_inds2 = getIndexByValue('title', sp_ap2)

  const cat_by_id = {}
  for (var i = 0; i < usvideos.length; i += 1) {
    if (!cat_by_id[usvideos[i]['categoryId']]) {
      cat_by_id[usvideos[i]['categoryId']] = [];
    }
    cat_by_id[usvideos[i]['categoryId']].push(i);
  }
  var cats = get_unique_Column('categoryId')

  const apex_ids = getIndexByValue('channelTitle', 'Apex Legends')
  const video_by_id = {}
  for (var i = 0; i < apex_ids.length; i += 1) {
    video_by_id[usvideos[apex_ids[i]]['title']] = apex_ids[i];
  }

  var tmp = sp_ap_inds.slice()
  tmp.splice(-1)
  var tmp2 = sp_ap_inds2.slice()
  tmp2.splice(-1)

  const _scaleY1 = scaleLinear()
    .domain([0, 50320889])
    .range([550, 50]);

  const _scaleX1 = scaleLinear()
    .domain([0, 31])
    .range([0, 500]);

  const _scaleX2 = scaleLinear()
    .domain([0, 365])
    .range([0, 1100]);

  const _scaleY2 = scaleLinear()
    .domain([0, 264407389])
    .range([550, 50]);

  const _scaleX4 = scaleLinear()
    .domain([0, 338004])
    .range([0, 500]);

  const _scaleX5 = scaleLinear()
    .domain([113, 119])
    .range([0, 500]);

  const _scaleY5 = scaleLinear()
    .domain([0, 7003748])
    .range([550, 50]);

  const _scaleX6 = scaleLinear()
    .domain([12, 19])
    .range([0, 500]);

  const _scaleY6 = scaleLinear()
    .domain([0, 5731933])
    .range([550, 50]);

  return (
    <div style={{ margin: 20 }}>
      <h1> 2021 Youtube Trending Videos </h1>
      <h3>Questions to be investigate: </h3>
      <ul>
        <li> What are the most popular videos? </li>
        <li> What are the trending patterns? </li>
        <li>  Insights of individual channel. </li>
      </ul>

      <h4> 1 All the Videos </h4>
      <p> We can see from the graph that some of the videos have outstanding popularity.
        The videos in the Music and the Entertainment categories sometimes have an extremely high number of views.
        Sports and Comedy sometimes also have relatively high trendings.
        We can also learn from the graph that at about a third of the year, a part of the data is missing.
      </p>
      <div style={{ display: "flex" }}>
        <svg
          width={1500}
          height={650}
        >
          <p>s</p>
          <text x={30} y={20}> Viz # 1 </text>
          <text x={400} y={20} fontSize={20}> Youtube Videos' Number of Views - 2021 </text>
          {cats.map((cat, i) => {
            var ids = cat_by_id[cat];
            return ids.map((id) => {
              return (
                <circle cx={100 + parseInt(usvideos[id]['trending_date']) / 365 * 1100} cy={550 - usvideos[id]['view_count'] / 264407389 * 500} r="3" fill={cat_cols[cat]} />
              )
            })
          })}
          <AxisLeft strokeWidth={0} left={80} scale={_scaleY2} />
          <AxisBottom
            strokeWidth={0}
            top={550}
            left={80}
            scale={_scaleX2}
            // tickValues={ages}
            fontSize={25}
          />
          {cats.map((cat, i) => {
            return (<circle cx={1250} cy={50 + i * 20} r="5" fill={cat_cols[cat]} />)
          })}
          {cats.map((cat, i) => {
            return (<text x={1250 + 20} y={55 + i * 20} fontSize={12} > {cat_names[cat]} </text>)
          })}
          <text x={1280} y={30}> Category </text>
          <text x={1210} y={570}> Days </text>
        </svg>
      </div>


      <h4> 2 Top 10 trending videos in January </h4>
      <p>
        The trending graph is showing the top 10 trending videos in January 2021.
        The trending shows that 7 out of the top 10 are in the music category.
        And also one is from sports, one is from entertainment, and one is from Science & Technology.
        We can also analyze from the graph that the music video and entertainment videos' tend is often shorter but grows extremely fast.
        For other categories of videos, they might trend for a long period of time but the trend grows slowly; or even short period of time, and also grow slowly.
      </p>
      <div style={{ display: "flex" }}>
        <svg
          width={2000}
          height={650}
        >
          <text x={30} y={20}> Viz # 2 </text>
          <text x={500} y={20}> Trending of 10 Top viewed Youtube Videos in January - 2021 </text>
          {
            videos.map((video, j) => {
              return (video_inds[j].map((ind, i) => {
                return (
                  <circle cx={80 + parseInt(usvideos[ind]['trending_date'] / 31 * 500)}
                    cy={550 - usvideos[ind]['view_count'] / 50320889 * 500}
                    r="5"
                    fill={cat_cols[usvideos[ind]['categoryId']]} />
                )
              }))
            })
          }
          {
            videos.map((video, j) => {
              var front = video_inds[j].slice()
              front.splice(-1)
              return (front.map((ind, i) => {
                return (
                  <line x1={80 + parseInt(usvideos[ind]['trending_date'] / 31 * 500)}
                    y1={550 - usvideos[ind]['view_count'] / 50320889 * 500}
                    x2={80 + parseInt(usvideos[video_inds[j][i + 1]]['trending_date'] / 31 * 500)}
                    y2={550 - usvideos[video_inds[j][i + 1]]['view_count'] / 50320889 * 500}
                    stroke={cat_cols[usvideos[ind]['categoryId']]} />
                )
              }))
            })
          }
          {
            videos.map((video, j) => {
              return (video_inds[j].map((ind, i) => {
                return (
                  <text x={90 + parseInt(usvideos[video_inds[j][video_inds[j].length - 1]]['trending_date'] / 31 * 500)}
                    y={550 - usvideos[video_inds[j][video_inds[j].length - 1]]['view_count'] / 50320889 * 500}
                    fontSize={10}
                    fill={"#848586"}>
                    {video}
                  </text>
                )
              }))
            })
          }
          <AxisLeft strokeWidth={0} left={80} scale={_scaleY1} />
          <AxisBottom
            strokeWidth={0}
            top={550}
            left={80}
            scale={_scaleX1}
            // tickValues={ages}
            fontSize={25}
          />
          <text x={50} y={600}> January </text>
          <text x={580} y={600}> Febuary </text>
          {cats.map((cat, i) => {
            return (<circle cx={1250} cy={250 + i * 20} r="5" fill={cat_cols[cat]} />)
          })}
          {cats.map((cat, i) => {
            return (<text x={1250 + 20} y={255 + i * 20} fontSize={12} > {cat_names[cat]} </text>)
          })}
          <text x={1280} y={230}> Category </text>
        </svg>
      </div>


      <h4> 3 Top 10 channels in Gaming </h4>
      <p>
        We can see the top 10 Trending Gaming channels clearly. As well as the difference in the top number of views of the videos between each channel.
        It shows which AnthonySenpai is the most trending/popular gaming channel. And the highest number of view in 2021 reached 72,681,293.
      </p>
      <div style={{ display: "flex" }}>
        <BubbleChart
          graph={{
            zoom: 0.8
          }}
          width={1000}
          height={650}
          padding={0}
          margin-left={280}
          legendFont={{
            family: 'Arial',
            size: 12,
            color: '#000',
            weight: 'bold',
          }}
          valueFont={{
            family: 'Arial',
            size: 12,
            color: '#fff',
            weight: 'bold',
          }}
          labelFont={{
            family: 'Arial',
            size: 16,
            color: '#fff',
            weight: 'bold',
          }}
          data={[
            { label: 'AnthonySenpai', value: 72681293 },
            { label: 'Dream', value: 29446290 },
            { label: 'Clash of Clans', value: 26158865 },
            { label: 'Brawl Stars', value: 26038234 },
            { label: 'MrBeast Gaming', value: 23204160 },
            { label: 'Klem Family', value: 21354428 },
            { label: 'Blantados', value: 17577632 },
            { label: 'Game My', value: 16564911 },
            { label: 'Markiplier', value: 15363758 },
            { label: 'Battlefield', value: 15068245 },
            { label: 'Craftee', value: 14739956 },
            { label: 'Clash Royale', value: 13959834 },
            { label: 'Magic: The Gathering', value: 13794161 },
            { label: 'Craftee', value: 13578128 },
            { label: 'steveee', value: 12648328 },
            { label: 'PrizMatex', value: 11226193 },
          ]}
        />
      </div>

      <h4> 4 Apex Legends </h4>
      <p> We could dig more into one specific channel. For example for Apex Legends - Gaming.
        We can see which videos are the most popular, which videos have more likes, and which videos have more dislikes.
        In this plot, we can see that all of Apex's video have a very low dislike compared to the number of likes.
        Most of Apex's videos are Trailers and stories of their games.
        Among them, the Legacy Launch Trailer has the highest number of likes.
        And the the likes and dislike did not increase much even when the number of views are constantly increasing.
        (These plots would be more informative for more controversial videos. )
      </p>
      <div style={{ display: "flex" }}>
        <svg
          width={2000}
          height={700}
        >
          <text x={30} y={20}> Viz # 4 </text>
          <text x={470} y={20}> Apex Legend | Likes vs. Dislike for all Videos | 2021 </text>
          {Object.values(video_by_id).map((id, i) => {
            return (
              <rect x={80 + 450} y={i * 25 + 50} height="10" width={usvideos[id]['likes'] / 338004 * 500} fill={'#87bfff'} />
            )
          })}
          {Object.values(video_by_id).map((id, i) => {
            return (
              <rect x={80 + 450} y={i * 25 + 60} height="10" width={usvideos[id]['dislikes'] / 338004 * 500} fill={'#f4d06f'} />
            )
          })}
          {Object.keys(video_by_id).map((name, i) => {
            return (
              <text x={80} y={i * 25 + 60} fill={'#76749a'} >{name} </text>
              // transform="rotate(-45)"
            )
          })}
          <circle cx={1200} cy={50} r={8} fill={"#87bfff"} />
          <text x={1220} y={55}> likes </text>
          <circle cx={1200} cy={75} r={8} fill={"#f4d06f"} />
          <text x={1220} y={80}> dislikes </text>
          <AxisBottom strokeWidth={0} left={530} top={620} scale={_scaleX4} transform={'rotate(-45)'} />
        </svg>
      </div>

      <div style={{ display: "flex" }}>
        <svg
          width={2000}
          height={650}
        >
          <p>s</p>
          <text x={30} y={20}> Viz # 5 </text>
          <text x={150} y={20}> Apex Legend | Legacy Launch Traile | view vs. like vs. dislike </text>
          {
            sp_ap_inds.map((ind, i) => {
              return (<circle cx={80 + (parseInt(usvideos[ind]['trending_date']) - 113) / 6 * 500} cy={550 - usvideos[ind]['view_count'] / 7003748 * 500} r={5} fill={"#76749a"} />)
            })
          }
          {
            tmp.map((ind, i) => {
              return (<line
                x1={80 + (parseInt(usvideos[ind]['trending_date']) - 113) / 6 * 500}
                y1={550 - usvideos[ind]['view_count'] / 7003748 * 500}
                x2={80 + (parseInt(usvideos[sp_ap_inds[i + 1]]['trending_date']) - 113) / 6 * 500}
                y2={550 - usvideos[sp_ap_inds[i + 1]]['view_count'] / 7003748 * 500}
                stroke={"#76749a"} />)
            })
          }
          {
            sp_ap_inds.map((ind, i) => {
              return (<circle cx={80 + (parseInt(usvideos[ind]['trending_date']) - 113) / 6 * 500} cy={550 - usvideos[ind]['likes'] / 7003748 * 500} r={5} fill={"#ffb5c2"} />)
            })
          }
          {
            tmp.map((ind, i) => {
              return (<line
                x1={80 + (parseInt(usvideos[ind]['trending_date']) - 113) / 6 * 500}
                y1={550 - usvideos[ind]['likes'] / 7003748 * 500}
                x2={80 + (parseInt(usvideos[sp_ap_inds[i + 1]]['trending_date']) - 113) / 6 * 500}
                y2={550 - usvideos[sp_ap_inds[i + 1]]['likes'] / 7003748 * 500}
                stroke={"#76749a"} />)
            })
          }
          {
            sp_ap_inds.map((ind, i) => {
              return (<circle cx={80 + (parseInt(usvideos[ind]['trending_date']) - 113) / 6 * 500} cy={550 - usvideos[ind]['dislikes'] / 7003748 * 500} r={5} fill={"#78c3fb"} />)
            })
          }
          {
            tmp.map((ind, i) => {
              return (<line
                x1={80 + (parseInt(usvideos[ind]['trending_date']) - 113) / 6 * 500}
                y1={550 - usvideos[ind]['dislikes'] / 7003748 * 500}
                x2={80 + (parseInt(usvideos[sp_ap_inds[i + 1]]['trending_date']) - 113) / 6 * 500}
                y2={550 - usvideos[sp_ap_inds[i + 1]]['dislikes'] / 7003748 * 500}
                stroke={"#76749a"} />)
            })
          }
          <AxisLeft strokeWidth={0} left={80} scale={_scaleY5} />
          <AxisBottom
            strokeWidth={0}
            top={550}
            left={80}
            scale={_scaleX5}
            fontSize={25}
          />
        </svg>
        <svg
          width={2000}
          height={650}
        >
          <text x={30} y={20}> Viz # 6  </text>
          <text x={90} y={20}> Apex Legends | Stories from the Outlands – “Good as Gold” | view vs. like vs. dislike</text>
          {
            tmp2.map((ind, i) => {
              return (<circle cx={80 + (parseInt(usvideos[ind]['trending_date']) - 19) / 7 * 500} cy={550 - usvideos[ind]['view_count'] / 5731933 * 500} r={5} fill={"#76749a"} />)
            })
          }
          {
            tmp2.map((ind, i) => {
              return (<line
                x1={80 + (parseInt(usvideos[ind]['trending_date']) - 19) / 7 * 500}
                y1={550 - usvideos[ind]['view_count'] / 5731933 * 500}
                x2={80 + (parseInt(usvideos[sp_ap_inds2[i + 1]]['trending_date']) - 19) / 7 * 500}
                y2={550 - usvideos[sp_ap_inds2[i + 1]]['view_count'] / 5731933 * 500}
                stroke={"#76749a"} />)
            })
          }
          {
            tmp2.map((ind, i) => {
              return (<circle cx={80 + (parseInt(usvideos[ind]['trending_date']) - 19) / 7 * 500} cy={550 - usvideos[ind]['likes'] / 5731933 * 500} r={5} fill={"#ffb5c2"} />)
            })
          }
          {
            tmp2.map((ind, i) => {
              return (<line
                x1={80 + (parseInt(usvideos[ind]['trending_date']) - 19) / 7 * 500}
                y1={550 - usvideos[ind]['likes'] / 5731933 * 500}
                x2={80 + (parseInt(usvideos[sp_ap_inds2[i + 1]]['trending_date']) - 19) / 7 * 500}
                y2={550 - usvideos[sp_ap_inds2[i + 1]]['likes'] / 5731933 * 500}
                stroke={"#76749a"} />)
            })
          }
          {
            tmp2.map((ind, i) => {
              return (<circle cx={80 + (parseInt(usvideos[ind]['trending_date']) - 19) / 7 * 500} cy={550 - usvideos[ind]['dislikes'] / 5731933 * 500} r={5} fill={"#78c3fb"} />)
            })
          }
          {
            tmp2.map((ind, i) => {
              return (<line
                x1={80 + (parseInt(usvideos[ind]['trending_date']) - 19) / 7 * 500}
                y1={550 - usvideos[ind]['dislikes'] / 5731933 * 500}
                x2={80 + (parseInt(usvideos[sp_ap_inds2[i + 1]]['trending_date']) - 19) / 7 * 500}
                y2={550 - usvideos[sp_ap_inds2[i + 1]]['dislikes'] / 5731933 * 500}
                stroke={"#76749a"} />)
            })
          }
          <AxisLeft strokeWidth={0} left={80} scale={_scaleY6} />
          <AxisBottom
            strokeWidth={0}
            top={550}
            left={80}
            scale={_scaleX6}
            // tickValues={ages}
            fontSize={25}
          />
        </svg>
      </div>
      <p> All codes can be found on <a href="https://github.com/jennyrrrrr/mysteries-couscous">github</a>.</p>

    </div>
  );
}

export default App
