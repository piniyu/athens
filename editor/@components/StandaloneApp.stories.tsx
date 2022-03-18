import styled from 'styled-components';
import { classnames } from '@/utils/classnames';
import { Storybook } from '@/utils/storybook';

import { useAppState } from '@/utils/useAppState';

import { LeftSidebar } from '@/concept/LeftSidebar';
import { RightSidebar } from '@/concept/RightSidebar';
import { AppToolbar } from '@/AppToolbar';
import { CommandBar } from '@/concept/CommandBar';
import { AppLayout, MainContent } from '@/concept/App';
import { Page } from '@/concept/Page';
import { usePresenceProvider } from '@/concept/Block/hooks/usePresenceProvider';

import { mockPeople } from '@/Avatar/mockData';
const mockPresence = mockPeople.map((p, index) => ({ ...p, uid: index.toString() }))

import {
  WithPresence
} from './concept/Block/Block.stories';

export default {
  title: 'App/Standalone',
  component: Window,
  argTypes: {
    connectionStatus: {
      options: ['local', 'connecting', 'connected', 'reconnecting', 'offline'],
      control: { type: 'radio' },
      defaultValue: 'local'
    }
  },
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [(Story) => <Storybook.Desktop><Story /></Storybook.Desktop>]
};

const WindowWrapper = styled.div`
  justify-self: stretch;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 10px 12px rgb(0 0 0 / 0.1);
  overflow: hidden;
  position: relative;
  background: var(--background-color);

  > * {
    z-index: 1;
  }

  &.os-windows {
    border-radius: 4px;
  }

  &.os-mac {
    border-radius: 12px;

    &.is-electron {
      &:before {
        content: '';
        width: 12px;
        height: 12px;
        position: absolute;
        border-radius: 100px;
        left: 20px;
        top: 19px;
        background: #888;
        z-index: 999999;
        box-shadow: 20px 0 0 0 #888, 40px 0 0 0 #888;
      }

      &.is-theme-dark {
        &:after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          z-index: 2;
          box-shadow: inset 0 0 1px #fff, 0 0 1px #000;
        }
      }
    }
  }

  &.is-win-maximized,
  &.is-win-fullscreen {
    border-radius: 0;
    height: 100vh;
    width: 100vw;
    margin: 0;
  }

  &.is-storybook-docs {
    height: 700px;
  }
`;

const Template = (args, context) => {
  const {
    currentUser,
    setCurrentUser,
    route,
    currentPageMembers,
    differentPageMembers,
    activeDatabase,
    setActiveDatabase,
    inactiveDatabases,
    isSynced,
    isElectron,
    setRoute,
    hostAddress,
    isThemeDark,
    setIsThemeDark,
    isWinFullscreen,
    isWinFocused,
    isWinMaximized,
    isLeftSidebarOpen,
    setIsLeftSidebarOpen,
    isRightSidebarOpen,
    setIsRightSidebarOpen,
    setIsSettingsOpen,
    isCommandBarOpen,
    setIsCommandBarOpen,
    isMergeDialogOpen,
    setIsMergeDialogOpen,
    isDatabaseDialogOpen,
  } = useAppState();

  const { PresenceProvider, clearPresence } = usePresenceProvider({ presentPeople: mockPresence });

  return (
    <WindowWrapper {...args}
      className={classnames(
        'os-' + args.os,
        'is-electron',
        isWinMaximized && 'is-win-maximized',
        isWinFocused && 'is-win-focused',
        isWinFullscreen && 'is-win-fullscreen',
      )}
    >
      <AppLayout>
        <AppToolbar
          os={args.os}
          route={route}
          isElectron={isElectron}
          isWinFullscreen={isWinFullscreen}
          isWinFocused={isWinFocused}
          isWinMaximized={isWinMaximized}
          isThemeDark={isThemeDark}
          isLeftSidebarOpen={isLeftSidebarOpen}
          isRightSidebarOpen={isRightSidebarOpen}
          isCommandBarOpen={isCommandBarOpen}
          isMergeDialogOpen={isMergeDialogOpen}
          isDatabaseDialogOpen={isDatabaseDialogOpen}
          hostAddress={hostAddress}
          currentUser={currentUser}
          currentPageMembers={currentPageMembers}
          differentPageMembers={differentPageMembers}
          activeDatabase={activeDatabase}
          inactiveDatabases={inactiveDatabases}
          isSynced={isSynced}
          connectionStatus={args.connectionStatus}
          handleChooseDatabase={(database) => setActiveDatabase(database)}
          handlePressAddDatabase={() => console.log('pressed add database')}
          handlePressRemoveDatabase={() => console.log('pressed remove database')}
          handlePressImportDatabase={() => console.log('pressed import database')}
          handlePressMoveDatabase={() => console.log('pressed move database')}
          handlePressMember={(person) => console.log(person)}
          handlePressCommandBar={() => setIsCommandBarOpen(!isCommandBarOpen)}
          handlePressDailyNotes={() => setRoute('/daily-notes')}
          handlePressAllPages={() => setRoute('/all-pages')}
          handlePressGraph={() => setRoute('/graph')}
          handlePressThemeToggle={() => setIsThemeDark(!isThemeDark)}
          handlePressMerge={() => setIsMergeDialogOpen(true)}
          handlePressSettings={() => setIsSettingsOpen(true)}
          handlePressHistoryBack={() => console.log('pressed go back')}
          handlePressHistoryForward={() => console.log('pressed go forward')}
          handlePressLeftSidebarToggle={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
          handlePressRightSidebarToggle={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
          handlePressMinimize={() => console.log('pressed minimize')}
          handlePressMaximizeRestore={() => console.log('pressed maximize/restore')}
          handlePressClose={() => console.log('pressed close')}
          handlePressHostAddress={(hostAddress) => console.log('pressed', hostAddress)}
          handleUpdateProfile={(person) => setCurrentUser(person)}
        />
        <LeftSidebar
          isLeftSidebarOpen={isLeftSidebarOpen}
          handlePressShortcut={() => null}
          shortcuts={[{
            uid: "4b89dde0-3ccf-481a-875b-d11adfda3f7e",
            title: "Passer domesticus",
            order: 1
          }, {
            uid: "bd4a892f-c7e5-45d8-bab8-68a8ed9d224f",
            title: "Spermophilus richardsonii",
            order: 2
          }, {
            uid: "b60fc12e-bf48-415c-a059-a7a4d5ef686e",
            title: "Leprocaulinus vipera",
            order: 3
          }, {
            uid: "c58d62e5-0e1b-4f30-a156-af8467317c1c",
            title: "Rangifer tarandus",
            order: 4
          }, {
            uid: "dd099e5d-1f6d-4be7-8bf0-9fc0310ba489",
            title: "Nycticorax nycticorax",
            order: 5
          }]}
          version="1.0.0"
        />
        <MainContent>
          <Page
            uid="123"
            title="Test Page"
            isLinkedReferencesOpen={true}
            isUnlinkedReferencesOpen={true}
            handlePressLinkedReferencesToggle={() => null}
            handlePressUnlinkedReferencesToggle={() => null}
          >
            <PresenceProvider>
              <Page.BlocksContainer><WithPresence /></Page.BlocksContainer>
            </PresenceProvider>
          </Page>
        </MainContent>
        <RightSidebar isRightSidebarOpen={isRightSidebarOpen} />
        {/* <Devtool /> */}
        {isCommandBarOpen && (<CommandBar
          autoFocus={true}
          handleCloseCommandBar={() => setIsCommandBarOpen(false)}
        />)
        }
      </AppLayout>
    </WindowWrapper>)
};

export const MacOs = Template.bind({});
MacOs.args = {
  os: 'mac',
  isElectron: true,
};

export const Windows = Template.bind({});
Windows.args = {
  os: 'windows',
  isElectron: true
};

export const Linux = Template.bind({});
Linux.args = {
  os: 'linux',
  isElectron: true
};
