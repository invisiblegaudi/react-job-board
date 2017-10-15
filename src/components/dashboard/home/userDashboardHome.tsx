import * as React from 'react';

//styles
import './userDashboardHome.scss';

import SpinnerComponent from "../../spinners/spinnerComponent";
import JobPostUpdatesComponent from "../jobs/job-post-updates/jobPostUpdatesComponent";
import {IMG_URL} from "../../../utils/utils";

interface MyProps {
	user,
	employer
}

class UserDashboardHome extends React.Component<MyProps> {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.employer.isFeteching === true) {
			return <SpinnerComponent/>
		}

		return (
			<div className='dashboard-home'>
				<h1 className={'header'}>
					Welcome {this.props.user.firstName} - {this.props.employer.name}
				</h1>
				<img className={'home-logo'} src={`${IMG_URL}${this.props.employer.logoImg}`} alt=""/>
				<JobPostUpdatesComponent jobs={this.props.employer.jobs}/>
				<div>
					<pre>{JSON.stringify(this.props.employer, null, 2)}</pre>
				</div>
			</div>
		)
	}
}

export default UserDashboardHome;