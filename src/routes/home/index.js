import { h } from "preact";
import { useEffect } from 'preact/hooks';
import { usePrerenderData } from '@preact/prerender-data-provider';
import style from "./style";

const Home = (props) => {
	const [data, isLoading] = usePrerenderData(props);
	/**
	 * Netlify CMS's accept invite link land on home page.
	 * This redirection takes it to the right place(/admin).
	 */

	useEffect(() => {
		if (window !== undefined && window.location.href.includes('#invite_token')) {
			const { href } = window.location;
			window.location.href= `${href.substring(0, href.indexOf('#'))}admin${href.substring(href.indexOf('#'))}`;
		}
	},[]);
	
	return (
		<div class={style.home}>
			<div class={style.about}>
				<div class={style.imageContainer}>
					<div class={style.image} />
				</div>
				<div class={style.quote}>
					<h1>Happy 30th birthday <span>Josh!</span></h1>
				</div>
			</div>
			<div class={style.grid}>
				{getVideos(data, isLoading)}
			</div>
		</div>
	);
};

function getVideos(data, isLoading) {
	if (isLoading) {
		return (
			<article class={style.loadingPlaceholder}>
				<h2 class={`${style.blogtitle} loading`}>&nbsp;</h2>
				<div class={`${style.loadingBody} loading`}>&nbsp;</div>
				<div class={`${style.loadingBody} loading`}>&nbsp;</div>
				<div class={`${style.loadingBody} loading`}>&nbsp;</div>
			</article>
		);
	}
	if (data && data.data) {
		const { data: friends } = data;
		console.log(friends)
		return <>{friends.map(({details}, index) => (
			<div style={`--r: ${Math.round(Math.sin(.3 * index) * 91 + 164)}; --g: ${Math.round(Math.sin(.3 * index + 2) * 91 + 164)}; --b: ${Math.round(Math.sin(.3 * index + 4) * 91 + 164)};`} class={style.griditem}>
			<h3 class={style.friendName}>{details.friend_name}</h3>
			<ul>
			{/* ▶ */}
				{details.friend_media_list.map(({title, friend_media}, index) => <li><a href={friend_media} target="_blank">{`Part ${index + 1}`}</a></li>)}
			</ul>
		</div>))}</>;
	}
}

export default Home;
