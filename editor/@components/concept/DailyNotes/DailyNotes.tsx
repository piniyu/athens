import styled from 'styled-components';
import { DateTime } from 'luxon';
import { Page } from '@/concept/Page';
import { BlockTree } from '@/concept/Block/Block.stories';

const dateFormat = { month: 'long', day: 'numeric' };

const DailyNotesWrap = styled.div`
  min-height: calc(100vh + 1px);
  display: flex;
  padding: 1.25rem 0;
  align-items: 0;
  flex: 1 1 100%;
  flex-direction: column;
`;

const DailyNotesPageWrap = styled.div`
  box-shadow: var(--depth-shadow-16);
  align-self: stretch;
  justify-self: stretch;
  margin: 1.25rem 2.5rem;
  padding: 1rem 2rem;
  transition-duration: 0s;
  border-radius: 0.5rem;
  min-height: calc(100vh - 10rem);
`;

/**
 * Current daily note, list of daily notes
 */
export const DailyNotes = ({ }) => {

  const today = DateTime.now();

  return (
    <DailyNotesWrap>
      <DailyNotesPageWrap>
        <Page
          title={today.toLocaleString(dateFormat)}
          isDailyNote={true}
          uid={today.toISODate()}
          handlePressRemoveShortcut={() => null}
          handlePressAddShortcut={() => null}
          handlePressShowLocalGraph={() => null}
          handlePressDelete={() => null}
          children={<Page.BlocksContainer><BlockTree /></Page.BlocksContainer>}
        />
      </DailyNotesPageWrap>
    </DailyNotesWrap>
  );
};