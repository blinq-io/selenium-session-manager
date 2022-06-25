import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

class SeleniumSessionServer {
  constructor(){
    this.sessions = [];
    this.app = express();
  }

  initServer = () => {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    const port = process.env.serverPort || 3000;
    const sessionJsonFile = process.env.sessionJson || './sessions/sessions.json';
    const workingFolder = process.env.workingFolder || null;
    let sessionJsonWorkingFile = sessionJsonFile;
    if (workingFolder !== null) {
      if (!fs.existsSync(workingFolder)) {
        fs.mkdirSync(workingFolder);
      }
      fs.copyFileSync(sessionJsonFile, `${workingFolder}/sessions.json`);
      sessionJsonWorkingFile = `${workingFolder}/sessions.json`;
    }

    this.app.post('/api/session', (req, res) => {
      console.log('Session was added', req.body, req.body.tags);
      const session = req.body;
      let indexes = this.searchForSession(session.tags, false);
      console.log('Found indexes to replace', indexes);
      const filteredSessions = this.sessions.filter((_session, i) =>
        indexes.includes(i) ? false : true
      );
      this.sessions = filteredSessions;
      this.sessions.push(session);
      fs.writeFileSync(sessionJsonWorkingFile, JSON.stringify(filteredSessions));
      res.send('Session was stored');
     });
     
     /*
     API to get all the sessions with given tags
     The tags should be passed as an array of strings in the request body
     */
    this.app.get('/api/session', (req, res) => {
      const tags = req.query.tags.split(',');
      let indexes = this.searchForSession(tags, true);
      console.log('Found indexes to return', indexes);
      if (this.sessions.length > 0) {
        res.send(this.sessions[indexes[indexes.length - 1]].cookies);
       } else {
         res.send('{"error": "No sessions stored"}');
       }
     });

    /*
     API to get all the sessions
     */
    this.app.get('/api/sessions', (req, res) => {
      res.send(this.sessions);
    });

    let dataTxt = '[]';
    try {
      dataTxt = fs.readFileSync(sessionJsonWorkingFile);
    } catch {};
    let dataJson = JSON.parse(dataTxt);
    this.sessions.push(...dataJson);
    console.log('Sessions loaded, ' + this.sessions.length + ' sessions found');
    console.log('Domains:');
    this.sessions.forEach((session) => {
      console.log(session.cookies[0].domain);
    });
     
    this.app.listen(port, () => console.log(`Example app listening on port ${port}!`));
  }
  
  
  /*
  Will search all the session that has matching tags (1 to 1 match, order is ignored)
  Return the indexes of the sessions that match the tags
  */
 searchForSession = (tags, contains) => {
   console.log('Searching for session with tags:', tags);
   let indexes = [];
   if (!tags || tags.length === 0) {
     console.log('No tags provided');
     return [];
    }
    this.sessions.forEach((session, i) => {
      let allInclude = true;
      if(!contains && tags.length != session.tags.length) {
        return;
      }
      tags.forEach((tag) => {
        if (session.tags.indexOf(tag) === -1) {
          allInclude = false;
        }
      });
      if (allInclude) {
        indexes.push(i);
      }
    });
    return indexes;
  };
  
  /*
  Store a session, if the session already exists, it will be overwritten
  */
}
export default SeleniumSessionServer;