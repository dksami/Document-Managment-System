import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SimpleModal from './Addfile';
import { Lightbox } from "react-modal-image";
import axios from 'axios'
import './content.css';
class Content extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			li : "",visi:false
		}
	}
	closeLightbox = () => {
		this.setState({open:false}) 
	};
	Delete=()=>{
		console.log(this.props.data.CurrentFolder.id)
		axios.delete('http://localhost:3000/Document/images/'+this.props.data.CurrentFolder.id,{  headers: {
			'auth': true,
			
		}}).then((res)=>{
			res.data.n == 0 ? this.DeleteFolder("0")
			: this.DeleteFolder(res.data.n)
			
		})
	}
	DeleteFolder=(i)=>{
		axios.delete('http://localhost:3000/Document/folder/'+this.props.data.CurrentFolder.id,{  headers: {
			'auth': true,
			
		}}).then((res)=>{
			res.data.n == 0 ? console.log("failed at folder") : console.log("Deleted Folder and total image of "+ i)
			window.location.reload(); 

			
		})
	}
	deleteNow(e){
		if(e == this.props.data.CurrentFolder.name){
			this.Delete()
		}
	}
	render() {
	console.log(this.props.data.CurrentFolder)
		if (this.props.data.length == 0) {
			return <div />;
		} else {
			return (
				<div>
					<Grid container spacing={3}>
						<Grid item xs={3} sm={3}>
							<h1>{this.props.data.CurrentFolder.name}</h1>
						</Grid>
						<Grid item xs={9} sm={9}>
						<Button onClick={()=> this.setState({visi:!this.state.visi}) }
								variant="contained"
								color="primary"

							>
								Delete Whole Folder
							</Button>
							{this.state.visi ? (<input onChange={(e)=> this.deleteNow(e.target.value)} placeholder={"Enter Folder Name to Continue"}/>) : (<span></span	>)}
							<Button
								onClick={() => this.props.dispatch({ type: 'OPENL', val: true })}
								variant="contained"
								color="primary"
							>
								Add A File
							</Button>
						</Grid>
					</Grid>
					<Grid container spacing={3}>
							{this.props.data.CurrentFolder.data.map((e,i) => (
								<Grid item>
									{e.contentType == "image/png" || e.contentType == "image/jpg" || e.contentType == "image/jpeg"  ? (<img height="300" onClick={()=> this.setState({li:"http://localhost:3000/Document/images/view/"+e._id,open:true})} src={"http://localhost:3000/Document/images/view/"+e._id} />) 
									: (<img height="300" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXvnK8otKbCJUT_q5yyu3kB4BlQPlGuepHcvzbIIdvIiAT9_3T"} />)}
								</Grid>
							))}
						</Grid>
					<SimpleModal id={this.props.data.CurrentFolder.id} />
				{
					this.state.open ? (
						<Lightbox
						
						medium={this.state.li}
						large={this.state.li}
						alt="Hello World!"
						onClose={this.closeLightbox}
						/>
					) : (<div></div>)
				}
				</div>
			);
		}
	}
}

const mapStateToProps = (state /*, ownProps*/) => {
	return { data: state.authentication };
};
export default connect(mapStateToProps)(Content);
