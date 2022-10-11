import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useQueryParam, StringParam } from 'use-query-params';

import { useModal } from '../hooks/modal';
import Footer from '../components/Footer';
import ScrollContainer from '../components/ScrollContainer';
import { useGroupedInterviews } from '../hooks/miller';
import {
  InterviewCard,
  GroupHeaderCard,
  InterviewOrderByFilter
} from '../components/interview';

import '../styles/pages/MagistrateJob.scss';


const MagistrateJob = () => {

  const { isModal }                   = useModal();
  const [ active, setActive ]         = useState();
  const [ queryOrder, setQueryOrder ] = useQueryParam('order', StringParam);
  const [ order, setOrder ]           = useState(queryOrder);
  const [ groups ]                    = useGroupedInterviews(order);

  //  Not change the order when the modal is opened
  useEffect(() => {
    if(!isModal) setOrder(queryOrder);
  }, [queryOrder, isModal])

  return (
    <React.Fragment>
      <ScrollContainer as={Container} fluid className="MagistrateJob px-3 px-sm-5">
        <Row className="position-sticky">
          <Col>
            <InterviewOrderByFilter value={order} onChange={setQueryOrder} />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="content">

              {groups.map(group =>
                <React.Fragment key={group.slug}>
                  <GroupHeaderCard group={group} onActiveGroup={setActive} />

                  {group.interviews?.map(interview =>
                    <InterviewCard
                      key           = {interview.slug}
                      interview     = {interview}
                      group         = {group}
                      isActive      = {!active || active === group}
                      onActiveGroup = {setActive}
                    />
                  )}

                </React.Fragment>
              )}

            </div>
          </Col>
        </Row>

        <Container>
          <Row className="mt-5 justify-content-center">
            <Col md={8}>
              <Footer />
            </Col>
          </Row>
        </Container>
      </ScrollContainer>

      <Outlet />
    </React.Fragment>
  )
}

export default MagistrateJob;
