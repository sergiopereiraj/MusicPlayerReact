import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [sing, setSing] = useState([]);
	useEffect(() => {
		obtenerDatos();
	}, []);

	const obtenerDatos = async () => {
		const data = await fetch("https://assets.breatheco.de/apis/sound/fx");
		const cancion = await data.json();
		setSing(cancion);
	};

	return (
		<>
			<body>
				<header>
					<h1>
						Winamp 60.60vs <i className="fas fa-music"></i>
					</h1>
				</header>
				<ol>
					{sing.map(item => (
						<li key={item.id}>
							{item.name} - {item.category}
						</li>
					))}
				</ol>
				<footer className="fixed-bottom">
					<button id="previous">
						<i className="fas fa-caret-square-left"></i>
					</button>
					<button id="play">
						<i className="fas fa-play"></i>
					</button>
					<button id="pause">
						<i className="fas fa-pause"></i>
					</button>
					<button>
						<i className="fas fa-caret-square-right"></i>
					</button>
				</footer>
			</body>
		</>
	);
};

export default Home;
