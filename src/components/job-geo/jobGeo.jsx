import React from 'react'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Modal,
  Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {getJobDetail,updateJob,deleteJob,getJobPoster,updateUser} from '../../redux/actions'
import UserList from '../../components/user-list/user-list'
import ApplyJob from '../../components/apply-job/apply-job'
import ViewCandidates from '../../components/view-candidates/view-candidates'
import GoogleMapReact from 'google-map-react';
import { Icon } from 'semantic-ui-react'

let posterId

const iconStyle = {  
  borderRadius: '100px',  
  boxShadow: '3px 3px 1px #888888'
} 

const CompanyMarker = ({ text }) => <div ><Icon name="user circle outline" 
color='blue' 
size='big' 
style={iconStyle}
/>{text}</div>;
 
const mapStyles = {
  width: '100%',
  height: '100%'
};

class JobGeo extends React.Component {  
      state = {
        jobTitle:'',
        jobType:'',
        content:'',
        company:'',
        position:'',    
        postCode: '',
        expire:'' ,
   
      }  
    componentDidMount () {
      const jobId= this.props.match.params.jobid;
      this.props.getJobDetail(jobId);               
    }
   
  toMain = () => {
    posterId=''
    this.props.history.replace('/')
  }
  render() {
    const userType=this.props.user.type;
    const userId=this.props.user._id;
    const applicant=this.props.jobDetail.applicant;

    const {jobTitle, jobType, content,company,position, postCode, expire}=this.props.jobDetail; 
    console.log(userId)  
    const center = {lat: 43.651070, lng: -79.347015};
    const zoom = 10;
                
        return (
        <div> 
          <div>***{jobTitle}***</div> 
          <div  style={{ width: '600px', height: '800px' }}>
          <GoogleMapReact 
            bootstrapURLKeys={{
              key: "todo: SETUP YOUR GOOGLE MAP API KEY", 
              language: 'en'
            }}
            defaultCenter={center}
            center={center}
            defaultZoom={zoom}

          >
          <CompanyMarker
            lat={43.69}
            lng={-79.39}
            text="My Marker"
          />
          </GoogleMapReact>
          </div>    
          <div> <Button type='primary' onClick={this.toMain}>Back to Main</Button></div>
        </div>
        )
    }
}


export default connect(
    state=>({jobDetail:state.jobDetail,user:state.user,jobPoster:state.jobPoster}),
    {getJobDetail,updateJob,deleteJob,getJobPoster,updateUser}
) (JobGeo)


