import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Row, Col } from 'react-bootstrap';
import { useStory } from '@c2dh/react-miller';

import Footer from '../components/Footer';
import ScrollContainer from '../components/ScrollContainer';

import '../styles/pages/StaticPage.scss';


const StaticPage = ({ pageId }) => {

  const [page] = useStory(pageId);

  return (
    <ScrollContainer className={`StaticPage ${pageId}`}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={10} xl={9}>
            <h1>{page?.data.title}</h1>
            <div>
              <ReactMarkdown linkTarget="_blank">
                {page?.data.abstract}
              </ReactMarkdown>
            </div>
          </Col>
        </Row>

        <Row className="mt-5 mb-5 justify-content-center">
          <Col md={8}>
            <Footer />
          </Col>
        </Row>

      </Container>
    </ScrollContainer>
  )
}

export default StaticPage;
