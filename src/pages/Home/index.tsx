import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';

import { FaTh, FaBars, FaSignLanguage, FaGitkraken, FaLinkedinIn, FaInstagram, FaGithub, FaCode } from "react-icons/fa";
import { GiWhiteCat } from "react-icons/gi";

import { Link } from 'react-router-dom';

interface Emote {
    title: string,
    symbol: string,
    keywords: string
}

function Home() {
    const [jsnResponse, setjsnResponse] = useState<Emote[]>([]);
    const [search, setSearch] = useState<string>('');
    const [indexOver, setIndexOver] = useState<number | undefined>();    
    const [showGrid, setShowGrid] = useState(true);

      useEffect(() => {
        axios
          .get<Emote[]>(
            "https://raw.githubusercontent.com/ahfarmer/emoji-search/master/src/emojiList.json"
          )
          .then((response) => {        
            if(search){               
                response.data = response.data.filter(emote => emote.keywords.includes(search.toLowerCase()));
            }
            setjsnResponse(response.data);

          }).catch((Error) => {
            console.error(Error);
          });      
      }, [search]);
    
  return (
    <>
   
    <Container fluid>
        <div className="float-right my-3">    
            <h2><Link to={{pathname: 'https://github.com/VivisMarrie/'}} target="_blank" ><FaLinkedinIn color='#5c32a8'/></Link></h2>
            <h2><Link to={{pathname: 'https://www.linkedin.com/in/vivribeiro/'}} target="_blank"><FaGithub color='#5c32a8'/></Link></h2>
            <h2><Link to={{pathname: 'https://www.instagram.com/vivismarrie/'}} target="_blank"><FaInstagram color='#5c32a8'/></Link></h2>
            
            <OverlayTrigger placement="left" overlay={<Tooltip id="tooltip">Desenvolvido por Viviane</Tooltip>}>
            <span className="d-inline-block">
                <h1><GiWhiteCat/></h1>
            </span>
            </OverlayTrigger>
            
            <h2><Link to={{pathname: 'https://github.com/VivisMarrie/'}} target="_blank"><FaCode color='#5c32a8' /></Link></h2>
        </div>

        <Container >
        <Jumbotron>  
            <h1 className="text-center"><FaSignLanguage color='orange' /> Emote Search <FaGitkraken color='#244db5' /></h1>
            <FormControl
                placeholder="Type keywords to find emoji"
                aria-label="Type keywords to find emoji"
                aria-describedby="basic-addon2" id='search' name='search' value={search}
                onChange={e => setSearch(e.target.value)} />
            <ButtonGroup className="float-right mt-1">
                <Button variant="secondary" onClick={() => {setShowGrid(true)}} ><FaTh/></Button>
                <Button variant="secondary" onClick={() => {setShowGrid(false)}} ><FaBars/></Button>
            </ButtonGroup>
        </Jumbotron>
                       
        {
            showGrid ?
                (
                <Row > 
                {
                jsnResponse.map((emote, index) => (

                    <OverlayTrigger
                    key={`overlay-${index}`}
                    placement="top"
                    overlay={
                        <Tooltip id={`tooltip-${index}`}>
                            {emote.title} <br/><small className="text-muted">Double Click to copy emoji</small>
                        </Tooltip>
                    }>
                    <Col lg='1' key={index} className="my-3">
                        <h1>
                            <span className="border border-secondary rounded p-1 user-select-none" onDoubleClick={() => {navigator.clipboard.writeText(emote.symbol)}} >
                                {emote.symbol}
                            </span>
                        </h1>
                    </Col>
                    </OverlayTrigger>
                ))
                }
                </Row>
                )
            :                
                <ListGroup>
                    {
                        jsnResponse.map((emote, index) => (
                            <ListGroup.Item key={index}  className="user-select-none"
                            onDoubleClick={() => {navigator.clipboard.writeText(emote.symbol)}}
                            onMouseOver={() => {setIndexOver(index)}}
                            onMouseLeave={() => {setIndexOver(undefined)}}>
                                {emote.symbol} {emote.title}                               
                                
                                <span id={`span-${index}`} className="float-right user-select-none" 
                                   style={ indexOver === index ? {visibility: 'visible' } : {visibility: 'hidden' }} 
                                ><small className="text-muted">Double Click to copy emoji</small></span>  
                            
                            </ListGroup.Item>
                        ))                
                    }
                </ListGroup>
        }
    </Container>
    </Container>
    </>
  )
}

export default Home;
