import { useState } from 'react';
import { Country, State, City } from 'country-state-city'

export const EditFilter = ({newPost, setNewPost}) => {
	const [countries] = useState(Country.getAllCountries())
	const [states, setStates] = useState([])
	const [cities, setCities] = useState([])

	const [selectedCountry, setSelectedCountry] = useState(null)
	const [selectedState, setSelectedState] = useState(null)

	const handleCountryChange = (country) => {
		setSelectedCountry(country)
		setStates(State.getStatesOfCountry(country.isoCode))
		setCities([])
	};

	const handleStateChange = (state) => {
		setSelectedState(state);
		setCities(City.getCitiesOfState(selectedCountry.isoCode, state.isoCode))
	};

	return (
		<div className='container'>
			<div className='flex-col'>
				<div className='col'>
					<select
						className="button-primary"
						onChange={(event) =>
							handleCountryChange(
								countries.find(country => country.isoCode === event.target.value))}>
						<option value=''>Select Country</option>
						{countries.map(country => (
							<option key={country.isoCode} value={country.isoCode}>
								{country.name}
							</option>
						))}
					</select>
				</div>
				<div className='col'>
					<select
						disabled={!selectedCountry}
						className="button-primary"
						onChange={(event) =>
							handleStateChange(
								states.find(state => state.isoCode === event.target.value))}>
						<option value=''>Select State</option>
						{states.map((state) => (
							<option key={state.isoCode} value={state.isoCode}>
								{state.name}
							</option>
						))}
					</select>
				</div>
				<div className='col'>
					<select
						disabled={!selectedState || !selectedCountry}
						className="button-primary"
                        onChange={(events) => {
                            const copy = {...newPost}
                            copy.cityName = events.target.value
                            setNewPost(copy)}}>
						<option value=''>Select City</option>
						{cities.map((city) => (
							<option key={city.name} value={city.name}>
								{city.name}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
}