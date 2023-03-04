import {Alert, Autocomplete, Button, Chip, TextField, Typography} from '@mui/material';
import './App.css';
import {schools} from './schools'
import {useEffect, useState} from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ReactDOMServer from 'react-dom/server'

const constantRecipients = ['fes@cbe.ab.ca','laahack@cbe.ab.ca','chiefsuperintendent@cbe.ab.ca','education.minister@gov.ab.ca','Edmonton.Glenora@assembly.ab.ca']
const freshAirSchoolsEmail = 'freshairschoolsab@gmail.com'

function App() {
    const [infoEntered, setInfoEntered] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [schoolName, setSchoolName] = useState()
    const [showCopyOperation, setShowCopyOperation] = useState()

    const schoolInfo = schools[schoolName]

    const submitInfo = () => {
        if (firstName && lastName && schoolInfo) {
            setInfoEntered(true)
        }
    }

    const recipients = () => {
        return [schoolInfo.principalEmail, schoolInfo.trusteeEmail, ...constantRecipients, freshAirSchoolsEmail].join(',')
    }
    
    const subjectLine = () => {
        return `CBE Students Deserve Better Air Quality!`
    }

    function copyBodyText(e,copyOnly) {
        e.preventDefault()
        setShowCopyOperation(copyOnly ? 'copy' : 'mailto')
    }

    useEffect(() => {
        if (showCopyOperation) {
            let range = document.createRange();
            const node = document.getElementById('bodyText')
            range.selectNode(node)
            window.getSelection().removeAllRanges()
            window.getSelection().addRange(range)

            try {
                document.execCommand('copy');
            } catch(err) {
                const str = ReactDOMServer.renderToString(bodyText())
                function listener(e) {
                    e.clipboardData.setData("text/html", str);
                    e.clipboardData.setData("text/plain", str);
                    e.preventDefault();
                }
                document.addEventListener("copy", listener);
                document.execCommand("copy");
                document.removeEventListener("copy", listener);
            }

            window.getSelection().removeAllRanges();

            if (showCopyOperation === 'mailto') {
                window.location.href = `mailto:${recipients()}?subject=${subjectLine()}&body=Body is on the clipboard, paste over this text...`
            }
            setShowCopyOperation(null)
        }
    },[showCopyOperation])

    const bodyText = () => {
        const {trustee, areaOffice, principal} = schoolInfo
        return (
            <div>To:<br/>
                {trustee}, Area {areaOffice} Trustee <br/>
                {principal}, {schoolName} Principal<br/>
                Laura Hack, Chair <br/>
                Christopher Usih, Chief Superintendent<br/>
                Adriana Lagrange, Minister of Education<br/>
                Sarah Hoffman, MLA, Critic for Education<br/>
                <br/>
                I am a Calgary Board of Education parent of a child at {schoolName} urging you to act on the ongoing outbreaks of respiratory illnesses including COVID-19, RSV and influenza in schools. This constant illness <a href="https://calgaryherald.com/news/local-news/student-absences-rise-calgary-schools-hepa-filters-air-quality">contributes significantly</a> to student and staff absences, our <a href="https://globalnews.ca/news/9307689/ahs-adds-additional-waiting-areas-alberta-childrens-hospital/">overwhelmed healthcare system</a> and continued educational disruption.<br/>
                <br/>
                Our children spend the majority of their waking hours in CBE classrooms. Improving air quality, in addition to helping reduce respiratory illnesses, <a href="https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(22)01604-X/fulltext">also has positive impacts on learning outcomes</a> and is <a href="https://www.mdpi.com/2073-4433/9/4/150/htm">important given the increasing occurrence of hazards like wildfire smoke</a>. While CBE has stated it has added MERV 13 filters to HVAC systems where possible, there is little information on which schools have these filters and what other steps will be taken.<br/>
                <br/>
                I am asking CBE to act in accordance with <a href="https://www.ashrae.org/file%20library/technical%20resources/covid-19/core-recommendations-for-reducing-airborne-infectious-aerosol-exposure.pdf">ASHRAE Epidemic Task Force</a> and <a href="https://www.albertahealthservices.ca/assets/info/ppih/if-ppih-covid-19-school-indoor-air-quality-covid-faq.pdf">Alberta Health Services</a> Guidelines and calls from the <a href="https://www.albertadoctors.org/news/protect-children-respiratory-virus-season">Alberta Medical Association Sections of Pediatrics and Emergency Medicine</a> to:<br/>
                <br/>
                1. Conduct ventilation system assessments of every school<br/>
                2. Be transparent about where improvements need to be made<br/>
                3. Allow in-room air cleaners (ie HEPA air purifiers, Corsi-Rosenthal Boxes) to be used in CBE classrooms, as Edmonton Public School District has done<br/>
                4. Incorporate CO2 monitoring to give CBE families information about the ventilation in schools, like <a href="https://www.bostonpublicschools.org/Page/8810">Boston Public Schools</a><br/>
                <br/>
                The CBE has a duty of care to their students. Our children deserve this protection.<br/>
                <br/>
                Thank you for your time,<br/>
                {firstName} {lastName}
            </div>
        )
    }

    function sendButton() {
        return (
            <Button variant="contained" onClick={(e) => copyBodyText(e)} style={{marginTop: '10px'}}>Send With Default Email App</Button>
        )
    }

    function fasLogo() {
        return (
            <div style={{ fontSize: 10, marginTop: 40, display: 'flex', flexDirection: 'row', alignItems: 'center', color: '#383838' }} className="fasIconCard">
                <img src="fasicon.png" style={{width: 30, height: 30, margin: 5}}/>
                <b><a href="https://twitter.com/FreshAirAB" target="_blank">Fresh Air Schools Alberta</a></b>
            </div>
        )
    }

    function selectSchool(e) {
        setSchoolName(e.target.innerText)
    }

    if (!infoEntered) {
        return (
            <div className="App">
                <div className="banner"><img src="banner.png" style={{maxWidth: 'calc(100% - 10px)'}}/></div>
                <header className="App-header">
                    <Typography variant="h5" component="h2" style={{marginTop: '15px'}}>
                        Demand better air quality for Calgary Board of Education students with this letter writing tool
                    </Typography>
                    <br/>
                    <Typography variant="body1" component="span">
                        Please enter the following information to generate a letter with specific contacts for your school:
                    </Typography>
                    <br/>
                    <Alert variant="filled" severity="info" style={{marginTop: 0, marginBottom: 10}}>
                        Your information will not be saved, as you send the letter from your own email account.
                    </Alert>
                    <TextField className='input' id="firstName" label="First Name" variant="outlined" onChange={(e) => setFirstName(e.target.value)} />
                    <TextField className='input' id="lastName" label="Last Name" variant="outlined" onChange={(e) => setLastName(e.target.value)}/>
                    <Autocomplete
                        disablePortal
                        id="schoolName"
                        options={Object.keys(schools)}
                        className='input'
                        selectOnFocus
                        onChange={(e) => selectSchool(e)}
                        renderInput={(params) => <TextField {...params} label="School Name" />}
                    />
                    <Button variant="contained" onClick={() => submitInfo()} style={{marginTop: '10px'}}>Generate Letter</Button>
                    {fasLogo()}
                </header>
            </div>
        )
    } else if (infoEntered) {
        return (
            <>
                <div className="App">
                    <header className="App-header">
                        <Alert variant="filled" severity="info" style={{marginTop: 10, marginBottom: 5}}>
                            You can copy the text using the “COPY” button in each field and paste into an email or click “SEND WITH DEFAULT EMAIL APP” to populate an email. Feel free to modify any of the text or recipients to personalize this message before sending. Fresh Air Schools AB will receive a copy of the email.
                        </Alert>
                        <div className="emailSection">
                            <Typography variant="body1" component="span">
                                <b>To: </b><Chip label={schoolInfo.principalEmail} /> <Chip label={schoolInfo.trusteeEmail} /> <Chip label="fes@cbe.ab.ca"/> <Chip label="laahack@cbe.ab.ca" /> <Chip label="chiefsuperintendent@cbe.ab.ca" /> <Chip label="education.minister@gov.ab.ca" /> <Chip label="Edmonton.Glenora@assembly.ab.ca" />
                            </Typography>
                            <Button className='copyButton' variant="text" size="small" endIcon={<ContentCopyIcon />} onClick={() => {navigator.clipboard.writeText(recipients())}}>
                                Copy Recipients
                            </Button>
                        </div>
                        <div className="emailSection">
                            <Typography variant="body1" component="span">
                                <b>Subject:</b> {subjectLine()}
                            </Typography>
                            <Button className='copyButton' variant="text" size="small" endIcon={<ContentCopyIcon />} onClick={() => {navigator.clipboard.writeText(subjectLine())}}>
                                Copy Subject
                            </Button>
                        </div>
                        <div className="emailSection">
                            <Typography variant="body2" component="span">
                                {bodyText()}
                            </Typography>
                            <Button className='copyButton' variant="text" size="small" endIcon={<ContentCopyIcon/>} onClick={(e) => copyBodyText(e,true)}>
                                Copy Body
                            </Button>
                        </div>
                        {sendButton()}
                    </header>
                </div>
                {showCopyOperation && <div id="bodyText">
                    {bodyText()}
                </div>}
            </>
        )
    }

}

export default App;
