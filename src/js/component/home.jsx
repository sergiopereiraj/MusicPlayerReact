import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	return (
		<>
			<body>
				<header>
					<h1>
						Winamp 60.60vs <i class="fas fa-music"></i>
					</h1>
				</header>
				<ol>
					<li>song 1</li>
					<li>song 2</li>
					<li>song 3</li>
					<li>song 4</li>
					<li>song 5</li>
					<li>song 6</li>
					<li>song 7</li>
				</ol>
				<footer>
					<i class="fas fa-caret-square-left"></i>
					<i class="fas fa-play"></i>
					<i class="fas fa-caret-square-right"></i>
				</footer>
			</body>
		</>
	);
};

export default Home;
