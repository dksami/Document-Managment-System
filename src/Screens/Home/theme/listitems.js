import React from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import axios from 'axios';
import './listitems.css';
import AppMenuItem from './AppMenuItem';
import { Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';

class MainListItems extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
			checkedA: true,
			show: false
		};
		this.Folders();
	}
	Folders = () => {
		axios
			.get('http://localhost:3000/Document/folder/all')
			.then((res) => {
				this.filtering(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	filtering(data) {
		var tree = this.unflatten(data);
		this.setState({ data: tree });
		
	}
	unflatten(arr) {
		var tree = [],
			mappedArr = {},
			arrElem,
			mappedElem;

		// First map the nodes of the array to an object -> create a hash table.
		for (var i = 0, len = arr.length; i < len; i++) {
			arrElem = arr[i];
			mappedArr[arrElem._id] = arrElem;
			mappedArr[arrElem._id]['children'] = [];
		}

		for (var id in mappedArr) {
			if (mappedArr.hasOwnProperty(id)) {
				mappedElem = mappedArr[id];
				// If the element is not at the root level, add it to its parent array of children.
				if (mappedElem.parent) {
						mappedArr[mappedElem['parent']]['children'].push(mappedElem);

				} else {
					// If the element is at the root level, add it to first level elements array.
					tree.push(mappedElem);
				}
			}
		}
		return tree;
	}
	handleChange = (name) => (event) => {
		this.setState({ [name]: event.target.checked });
	};
	CreateFolder = ()=>{
		const data = {
		"Name": this.state.folderName,
		"desc": this.state.desc,
		"cover": null,
		"parent": this.state.checkedA ? this.props.data.id : null
	  }
	  axios.post('http://localhost:3000/Document/folder/',data).then((res)=>{
	  	res.data.insertedCount == "1" ? this.Folders() : console.log(res.data)
	  })
	  
	} 
	render() {
		if (this.state.data == null) {
			return <div />;
		} else {
			return (
				<List component="nav" className={'appMenu'} disablePadding>
					<Divider />
					{this.state.data.map((item, index) => (
						<AppMenuItem action={this.props.dispatch} icon={0} {...item} key={index} />
					))}
					<Button
						onClick={() => this.setState({ show: !this.state.show })}
						variant="outlined"
						fullWidth
						color="primary"
					>
						Expend
					</Button>
					{this.state.show ? (
						<div>
							<TextField
								required
								fullWidth
								style={{ margin: 10 }}
								id="standard-required"
								label="Folder Name"
								onChange={(e)=> this.setState({folderName:e.target.value})}
							/><br/>
							<TextField
								required
								fullWidth
								style={{ margin: 10 }}
								id="standard-required"
								label="Folder Desc"
								onChange={(e)=> this.setState({desc:e.target.value})}
							/>
							<br />
							<Switch
								checked={this.state.checkedA}
								onChange={this.handleChange('checkedA')}
								value="checkedA"
								inputProps={{ 'aria-label': 'secondary checkbox' }}
							/>{' '}
							Current Folder ?<br />
							<Button onClick={()=> this.CreateFolder()} fullWidth color="primary">
								Create Now
							</Button>
						</div>
					) : (
						<div />
					)}
				</List>
			);
		}
	}
}
const mapStateToProps = (state /*, ownProps*/) => {
	return {data : state.authentication.CurrentFolder};
};
export default connect(mapStateToProps)(MainListItems);
