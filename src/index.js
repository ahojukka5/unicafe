import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import 'semantic-ui-css/semantic.min.css';

import {
  Button,
  Container,
  Grid,
  Header,
  Image,
  Table,
  Segment,
} from 'semantic-ui-react';

const Statistic = ({ text, value, unit, round }) => {
  return (
    <Table.Row>
      <Table.Cell>{text}</Table.Cell>
      <Table.Cell textAlign="right">
        {round ? Math.round(value * 100) / 100 : value} {unit}
      </Table.Cell>
    </Table.Row>
  );
};
const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  if (all === 0) {
    return <p>No feedback given</p>;
  }
  const avg = (1 / all) * (good - bad);
  const pos = (good / all) * 100;
  return (
    <Table basic="very" celled fixed unstackable>
      <Table.Body>
        <Statistic text="Good" value={good} />
        <Statistic text="Neutral" value={neutral} />
        <Statistic text="Bad" value={bad} />
        <Statistic text="All" value={all} />
        <Statistic text="Average" value={avg} round />
        <Statistic text="Positive" value={pos} round unit="%" />
      </Table.Body>
    </Table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onGood = () => {
    setGood(good + 1);
  };

  const onNeutral = () => {
    setNeutral(neutral + 1);
  };

  const onBad = () => {
    setBad(bad + 1);
  };

  return (
    <Container text style={{ paddingTop: '1em', paddingBottom: '1em' }}>
      <Grid textAlign="center" columns={1}>
        <Grid.Column style={{ maxWidth: 400 }}>
          <Grid columns={2} verticalAlign="middle">
            <Grid.Column width={6}>
              <Image src="/logo.png" />
            </Grid.Column>
            <Grid.Column width={10}>
              <Header as="h1">Uniface feedback system</Header>
            </Grid.Column>
          </Grid>
        </Grid.Column>

        <Grid.Column style={{ maxWidth: 400 }}>
          <Header as="h3" attached="top" block>
            Give feedback
          </Header>
          <Segment attached>
            <Button onClick={onGood}>Good </Button>
            <Button onClick={onNeutral}>Neutral</Button>
            <Button onClick={onBad}>Bad</Button>
          </Segment>
        </Grid.Column>
        <Grid.Column style={{ maxWidth: 400 }}>
          <Header as="h3" attached="top" block>
            Statistics
          </Header>
          <Segment attached>
            <Statistics good={good} neutral={neutral} bad={bad} />
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
