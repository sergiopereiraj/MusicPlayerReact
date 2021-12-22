import React, { useEffect, useRef, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [url] = useState("https://assets.breatheco.de/apis/sound/songs");
	const [condicion, setCondicion] = useState(false);
	const [song, setSong] = useState([]);

	useEffect(() => {
		obtenerDatos();
	}, []);
	let audioRef = useRef(null);

	const reproducir = url => {
		if (
			audioRef.current.src ===
			"https://assets.breatheco.de/apis/sound/" + url
		) {
			audioRef.current.play();
		} else {
			audioRef.current.src =
				"https://assets.breatheco.de/apis/sound/" + url;
			audioRef.current.play();
		}
		setCondicion(true);
	};

	const obtenerDatos = async () => {
		const data = await fetch(url);
		const cancion = await data.json();
		setSong(cancion);
	};

	return (
		<>
			<body>
				<header>
					<h1>
						Winamp 60.60vs <i className="fas fa-music"></i>
					</h1>
				</header>
				<div id="botones" className="">
					{song.map(item => (
						<li key={item.id} className="d-grid gap-2">
							<button
								type="button"
								className="btn btn-secondary p-2 bd-highlight"
								onClick={() => {
									reproducir(song.url);
								}}>
								{item.name} -
							</button>
						</li>
					))}
				</div>
				<footer className="">
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
