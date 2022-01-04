import React, { useEffect, useRef, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [url] = useState("https://assets.breatheco.de/apis/sound/songs");
	const options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	};
	const [condicion, setCondicion] = useState(false);
	const [song, setSong] = useState([]);
	const [songMap, setSongMap] = useState({});

	let audioRef = useRef();

	useEffect(() => {
		obtenerDatos();
	}, []);

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
		return setCondicion(true);
	};
	const pausar = () => {
		audioRef.current.pause();
		setCondicion(false);
	};

	const obtenerDatos = async () => {
		const data = await fetch(url, options);
		const cancion = await data.json();

		setSong(cancion);
	};
	return (
		<>
			<body>
				<header className="sticky-top">
					<h1>
						Music Geeks <i className="fas fa-music"></i>
					</h1>
				</header>
				<div id="botones" className="container">
					{song.length === 0 ? (
						<h1>Cargando...</h1>
					) : (
						song.map(item => (
							<>
								<li key={item.id} className="d-grid gap-2">
									<button
										type="button"
										className="btn btn-warning p-2 bd-highlight"
										onClick={e => {
											reproducir(item.url);
										}}>
										{item.name} -
									</button>
									<audio
										id="player"
										src={
											"https://assets.breatheco.de/apis/sound/" +
											item.url
										}
										ref={audioRef}
									/>
								</li>
							</>
						))
					)}
				</div>
				<footer className="fixed-bottom">
					<button className="text-warning" id="previous">
						<i className="fas fa-caret-square-left"></i>
					</button>
					{condicion ? (
						<button
							className="text-warning"
							id="pause"
							onClick={() => pausar()}>
							<i className="fas fa-pause"></i>
						</button>
					) : (
						<button className="text-warning" id="play">
							<i className="fas fa-play"></i>
						</button>
					)}
					<button className="text-warning">
						<i className="fas fa-caret-square-right"></i>
					</button>
				</footer>
			</body>
		</>
	);
};

export default Home;
