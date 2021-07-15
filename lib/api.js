export const getInitialMails = () => {
  return {
    'mail-0': {
      mailUid: 'mail-0',
      senderUid: 'Rick-1234',
      receiverUids: ['Jason-1234'],
      sentAt: 1626305155,
      content: 'Dear Jason, bla bla bla bla',
      sourceThreadId: 'thread-0'
    },
    'mail-1': {
      mailUid: 'mail-1',
      senderUid: 'Jason-1234',
      receiverUids: ['Rick-1234'],
      sentAt: 1626305155,
      content: 'Dear Rick, reply to bla bla bla bla',
      sourceThreadId: 'thread-1'
    },
    'mail-2': {
      mailUid: 'mail-2',
      senderUid: 'Jenny-1234',
      receiverUids: ['Jason-1234'],
      sentAt: 1626305155,
      content: 'Dear Jason, reply to bla bla bla bla',
      sourceThreadId: 'thread-2'
    },
  }
};

export const getInitialMailThreads = () => {
  return {
    'Rick-1234': [
      {
        threadId: 'thread-0',
        threadOwnerUid: 'Rick-1234',
        threadTitle: 'Regarding New Zmail Feature',
        headMailUid: 'mail-1',
        isImportant: false,
        hasUnread: true,
        starredMailUids: [],
        deletedMailUids: [],
        threadParticipants: ['Jason-1234'],
        linkedMailUids: {
          'mail-0': null,
          'mail-1': 'mail-0',
        }
      }
    ],
    'Jason-1234': [
      {
        threadId: 'thread-1',
        threadOwnerUid: 'Jason-1234',
        threadTitle: 'Regarding New Zmail Feature',
        headMailUid: 'mail-1',
        isImportant: false,
        hasUnread: true,
        starredMailUids: [],
        deletedMailUids: [],
        threadParticipants: ['Rick-1234'],
        linkedMailUids: {
          'mail-0': null,
          'mail-1': 'mail-0',
        }
      },
      {
        threadId: 'thread-3',
        threadOwnerUid: 'Jason-1234',
        threadTitle: 'Greeting from a new user!',
        headMailUid: 'mail-2',
        isImportant: false,
        hasUnread: true,
        starredMailUids: [],
        deletedMailUids: [],
        threadParticipants: ['Jenny-1234'],
        linkedMailUids: {
          'mail-2': null,
        }
      }
    ],
    'Jenny-1234': [
      {
        threadId: 'thread-2',
        threadOwnerUid: 'Jenny-1234',
        threadTitle: 'Greeting from a new user!',
        headMailUid: 'mail-2',
        isImportant: false,
        hasUnread: true,
        starredMailUids: [],
        deletedMailUids: [],
        threadParticipants: ['Jason-1234'],
        linkedMailUids: {
          'mail-2': null,
        }
      }
    ]
  }
};

export const getInitialUsers = () => {
  return {
    'Rick-1234': {
      userUid: 'Rick-1234',
      displayName: 'Rick',
      email: 'rick@zmail.com',
      photoUrl: 'https://gravatar.com/avatar/762cbbab74ca0b222c1aaed8948be973?s=400&d=identicon&r=x',
      spammedUserUids: [],
      blockedUserUids: []
    },
    'Jason-1234': {
      userUid: 'Jason-1234',
      displayName: 'Jason',
      email: 'jason@zmail.com',
      photoUrl: 'https://gravatar.com/avatar/4ca469ca1aaf654b4ea9b66d707633dd?s=400&d=identicon&r=x',
      spammedUserUids: [],
      blockedUserUids: [],
    },
    'Paul-1234': {
      userUid: 'Paul-1234',
      displayName: 'Paul',
      email: 'paul@zmail.com',
      photoUrl: 'https://gravatar.com/avatar/b93feab801e929f410d7a154690e1c51?s=400&d=identicon&r=x',
      spammedUserUids: [],
      blockedUserUids: [],
    },
    'Jenny-1234': {
      userUid: 'Jenny-1234',
      displayName: 'Jenny',
      email: 'jenny@zmail.com',
      photoUrl: 'https://gravatar.com/avatar/812a467548d161b286f205c93ec790c7?s=400&d=identicon&r=x',
      spammedUserUids: [],
      blockedUserUids: []
    },
    'Sylvia-1234': {
      userUid: 'Sylvia-1234',
      displayName: 'Sylvia',
      email: 'sylvia@zmail.com',
      photoUrl: 'https://gravatar.com/avatar/5510d8bfdaec458391dde465e150b4d2?s=400&d=identicon&r=x',
      spammedUserUids: [],
      blockedUserUids: []
    },
    'Paula-1234': {
      userUid: 'Paula-1234',
      displayName: 'Paula',
      email: 'paula@zmail.com',
      photoUrl: 'https://gravatar.com/avatar/112af9daaf0c5dde5e9dc9ce2bb65748?s=400&d=identicon&r=x',
      spammedUserUids: [],
      blockedUserUids: []
    }
  }
}
