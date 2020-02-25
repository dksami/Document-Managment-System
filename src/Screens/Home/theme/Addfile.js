import React, { useCallback } from 'react';
import Paper from '@material-ui/core/Paper';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import './Addfile.css';
import TextField from '@material-ui/core/TextField';
import { createStyles } from '@material-ui/core';
import Dropzone from 'react-dropzone';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

class SimpleModal extends React.Component {
	constructor() {
		super();
		this.state = {
			showModal: false,
      showB: [],
      data : []
		};

		this.handleCloseModal = this.handleCloseModal.bind(this);
	}

	handleCloseModal() {
    this.setState({showB:[]})
    this.props.dispatch({ type: 'OPENL', val: false });

	}

	HandlingFiles(file) {
		
    let a = [];
		file.forEach((file) => file.type == "image/jpeg" || file.type == "image/png" ?  this.setState({data:[...this.state.data,file], showB: [ ...this.state.showB, {name:file.name ,img : URL.createObjectURL(file)} ] }): this.setState({data:[...this.state.data,file],  showB: [ ...this.state.showB,{name:file.name ,img :  'https://img.freepik.com/free-vector/illustration-folder-with-document_53876-28502.jpg?size=626&ext=jpg'} ] }));
  }
  Uplaod(){
    const data = new FormData() 
    for(var x = 0; x<this.state.data.length; x++) {
      data.append('picture', this.state.data[x])
    
    }
    var config = {
      onUploadProgress:(progressEvent) => {
          var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
          this.setState({Uploading: percentCompleted}); //How set state with percentCompleted?
      }
      };
    data.append('title', this.state.title ? this.state.title : "untitled" )
    data.append('relate', this.props.id)
    axios.post("http://localhost:3000/Document/images/", data, { config // receive two parameter endpoint url ,form data 
      })
      .then(res => { // then print response status
        this.setState({data:[],showB:[]})
      }).catch((err)=>{
        console.log(err)
      })
  }


	render() {

		return (
			<div>
				<Modal isOpen={this.props.Open} contentLabel="Minimal Modal Example" overlayClassName="Overlay">
        <Grid container spacing={3}>
        <Grid item>
                  	<TextField
						id="outlined-email-input"
						label="Title"
						className={useStyles.textField}
						type="text"
						name="title"
						margin="normal"
            variant="outlined"
            onChange={(e)=>{this.setState({title:e.target.value})}}
					/>
          </Grid>
          <Grid item>
          <Button onClick={()=>this.state.data.length == 0 ? console.log("Empty Data Cannot Be uploaded"):this.Uplaod()} variant="contained" color="primary" className={"button"}>
            Upload the Images 
          </Button>
          </Grid>
          <Grid item>

          <Button onClick={this.handleCloseModal} variant="contained" color="primary" className={"button"}>
            Cancel 
          </Button>
          </Grid>
          <Grid item>

          <Button onClick={()=> this.setState({data:[],showB:[]}) } variant="contained" color="primary" className={"button"}>
            clear 
          </Button>
          </Grid>
          </Grid>

					<Dropzone onDrop={(acceptedFiles) => this.HandlingFiles(acceptedFiles)}>
						{({ getRootProps, getInputProps }) => (
            <Paper >
							<section>
								<div {...getRootProps()} style={useStyles.root}>
									<input {...getInputProps()}  />
									<p>Drag 'n' drop some files here, or click to select files</p>
								</div>
							</section>
              </Paper>
						)}
					</Dropzone>

					{this.state.showB ? (
						<Grid container spacing={3}>
							{' '}
							{this.state.showB.map((e,i) => (
								<Grid item>
									{/* <img height="300" src={e} /> */}
                  <DisplayCard action={this.deleteImage} index={i} image={e}/>
								</Grid>
							))}
						</Grid>
					) : (
						<p>No file</p>
					)}
				</Modal>
			</div>
		);
	}
}

const useStyles = createStyles({
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	textField: {
		marginLeft: 10,
		marginRight: 10
	},
	dense: {
		marginTop: 10
	},
	menu: {
		width: 200
	}, button: {
    marginTop: 1000,
  },root : {
    padding:40
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function DisplayCard(props){
  console.log(props)
  return ( <Card style={useStyles.card}>
    <CardActionArea>
    									<img height="300" src={props.image.img} />

      <CardContent>
    
        <Typography variant="body2" color="textSecondary" component="p">
        {props.image.name}
          </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
     
  
    </CardActions>
  </Card>)
}

const mapStateToProps = (state /*, ownProps*/) => {
	return state.authentication.Open ? { Open: state.authentication.Open } : { Open: false };
};
export default connect(mapStateToProps)(SimpleModal);
