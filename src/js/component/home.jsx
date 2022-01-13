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
	const [songMap, setSongMap] = useState([]);
	const [playlist, setPlaylist] = useState(" ");
	const [setId, setSetId] = useState(0);

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
	const next = (id, song) => {
		console.log(id);
		console.log(song);
		reproducir(song.url);
		setPlaylist(song.url);
		setSetId(id + 1);
	};
	const prev = (id, song) => {
		reproducir(song.url);
		setPlaylist(song.url);
		setSetId(id + -1);
	};

	const obtenerDatos = async () => {
		const data = await fetch(url, options);
		const cancion = await data.json();
		setSong(cancion);
		/* 	const objetoVacio = {};
		data.map(cancion => {
			objetoVacio[cancion.id] = cancion.url;
		});
		setSongMap(objetoVacio); */
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
						<h1>
							Cargando...<i className="fas fa-music"></i>
						</h1>
					) : (
						song.map(item => (
							<>
								<li key={item.id} className="d-grid gap-2">
									<button
										type="button"
										className="btn btn-warning p-2 bd-highlight"
										onClick={e => {
											reproducir(item.url);
											setPlaylist(item.url);
											setSetId(item.id);
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
					<button
						className="text-warning"
						id="previous"
						onClick={() => prev(setId, song[setId - 1])}>
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
					<button
						className="text-warning"
						onClick={() => next(setId, song[setId + 1])}>
						<i className="fas fa-caret-square-right"></i>
					</button>
				</footer>
			</body>
		</>
	);
};

export default Home;
