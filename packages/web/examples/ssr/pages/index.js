/* eslint-disable */
import React, { Component } from 'react';
import {
	ReactiveBase,
	DataSearch,
	NumberBox,
	// RangeSlider,
	ResultCard,
} from '@appbaseio/reactivesearch';
import initReactivesearch from '@appbaseio/reactivesearch/lib/server';

import './styles/airbnb.css';

const components = {
	settings: {
		app: 'airbeds-test-app',
		credentials: 'X8RsOu0Lp:9b4fe1a4-58c6-4089-a042-505d86d9da30',
		type: 'listing',
		theme: {
			colors: {
				primaryColor: '#FF3A4E',
			},
		},
	},
	datasearch: {
		componentId: 'SearchSensor',
		dataField: 'name',
		autosuggest: false,
		placeholder: 'Search by house names',
		iconPosition: 'left',
		className: 'search',
		highlight: true,
		URLParams: true,
	},
	numberbox: {
		componentId: 'GuestSensor',
		dataField: 'accommodates',
		title: 'Guests',
		defaultValue: 2,
		labelPosition: 'right',
		data: {
			start: 1,
			end: 16,
		},
		URLParams: true,
	},
	rangeslider: {
		componentId: 'PriceSensor',
		dataField: 'price',
		title: 'Price Range',
		range: {
			start: 10,
			end: 250,
		},
		rangeLabels: {
			start: '$10',
			end: '$250',
		},
		defaultValue: {
			start: 10,
			end: 50,
		},
		stepValue: 10,
		interval: 20,
	},
	resultcard: {
		className: 'right-col',
		componentId: 'SearchResult',
		dataField: 'name',
		size: 12,
		renderItem: data => ({
			image: data.image,
			title: data.name,
			description: (
				<div>
					<div className="price">${data.price}</div>
					<p className="info">
						{data.room_type} · {data.accommodates} guests
					</p>
				</div>
			),
			url: data.listing_url,
		}),
		pagination: true,
		URLParams: true,
		react: {
			and: ['SearchSensor', 'GuestSensor'],
		},
		innerClass: {
			resultStats: 'result-stats',
			list: 'list',
			listItem: 'list-item',
			image: 'image',
		},
	},
};

export default class Main extends Component {
	static async getInitialProps({ pathname, query }) {
		return {
			store: await initReactivesearch(
				[
					{
						...components.datasearch,
						source: DataSearch,
					},
					{
						...components.numberbox,
						source: NumberBox,
					},
					// {
					// 	...components.rangeslider,
					// 	source: RangeSlider,
					// },
					{
						...components.resultcard,
						source: ResultCard,
					},
				],
				query,
				components.settings,
			),
		};
	}

	render() {
		return (
			<div className="container">
				<ReactiveBase {...components.settings} initialState={this.props.store}>
					<nav className="nav">
						<div className="title">Airbeds</div>
						<DataSearch {...components.datasearch} />
					</nav>
					<div className="left-col">
						<NumberBox {...components.numberbox} />
						{/* <RangeSlider {...components.rangeslider} /> */}
					</div>

					<ResultCard {...components.resultcard} />
				</ReactiveBase>
			</div>
		);
	}
}
