export default {
  namespaced: true,
  state: {
    pages: {
      login: {
        title: 'Привет!',
        text: 'Мы создали это место, чтобы вы смогли развиваться, чувствую себя максимально комфортно в кругу приятных людей. Это сообщество профессионалов, объединённых одной идеей — с помощью кода, магия станет реальностью!',
        btn: {
          link: 'Registration',
          text: 'Регистрация'
        }
      },
      registration: {
        title: 'Быстрая регистрация',
        text: 'Чтобы воспользоваться всеми возможностями сервиса: вам необходимо зарегистрироваться. Это не займёт больше 1 минуты!',
        descr: 'Если вы зарегистрированы, просто войдите в аккаунт',
        btn: {
          link: 'Login',
          text: 'У меня уже есть аккаунт',
          variant: 'dark'
        }
      },
      'registration-success': {
        title: 'Вы зарегистрированы!',
        text: 'Ваш аккаунт успешно создан. Чтобы активировать его, вам необходимо войти в систему, использую данные, указанные при регистрации.',
        btn: {
          link: 'Login',
          text: 'Войти'
        }
      },
      forgot: {
        title: 'Восстановление пароля',
        text: 'Чтобы восстановить пароль, укажите e-mail, к которому привязана ваша страница. Мы отправим ссылку для восстановаления пароля туда.',
        btn: {
          link: 'Login',
          text: 'Вернуться к авторизации',
          variant: 'dark'
        }
      },
      'forgot-success': {
        title: 'На ваш e-mail отправлена ссылка для восстановления пароля',
        text: 'В течение 5 минут, на указанную вами почту, придёт письмо со ссылкой. Перейдите по ней, чтобы восстановить пароль.',
        btn: {
          link: '',
          text: 'Перейти в почту'
        }
      },
      'change-password': {
        title: 'Смена пароля',
        text: 'Ваш старый пароль был сброшен. Придумайте новый пароль для входа на сайт.'
      },
      'change-password-success': {
        title: 'Пароль успешно изменён!',
        text: 'Пароль был успешно изменён, Используйте данный пароль для последующих процессов авторизации.',
        btn: {
          link: 'Login',
          text: 'Войти'
        }
      },
      'shift-password': {
        title: 'Смена пароля',
        text: 'Придумайте новый пароль, впоследсвии вы сможете его сменить',
      },
      'shift-email': {
        title: 'Смена почты',
        text: 'Введите новый почтовый ящик',
      },
      'shift-email-success': {
        title: 'На ваш новый  e-mail  отправлено письмо с подтверждением',
        text: 'В течение 5 минут, на указанную вами почту, придёт письмо со ссылкой. Перейдите по ней, чтобы подтвердить e-mail.',
        btn: {
          link: '',
          text: 'Перейти в почту'
        }
      }
    },
    languages: {
      active: {
        id: 'ru',
        text: 'Русский'
      },
      list: [{
          id: 'ru',
          text: 'Русский'
        },
        {
          id: 'en',
          text: 'England'
        },
        {
          id: 'az',
          text: 'Azerbaycan dili'
        },
        {
          id: 'bah',
          text: 'Bahasa Indonesia'
        },
        {
          id: 'bo',
          text: 'Bosanski'
        },
        {
          id: 'dn',
          text: 'Dansk'
        },
        {
          id: 'deu',
          text: 'Deutsch'
        },
        {
          id: 'ee',
          text: 'Eesti'
        },
        {
          id: 'es',
          text: 'Español'
        },
        {
          id: 'esp',
          text: 'Esperanto'
        },
        {
          id: 'fr',
          text: 'Français'
        },
        {
          id: 'hr',
          text: 'Hrvatski'
        },
        {
          id: 'it',
          text: 'Italiano'
        },
        {
          id: 'ka',
          text: 'Karjalan kieli'
        },
        {
          id: 'ki',
          text: 'Kiswahili'
        },
        {
          id: 'rys',
          text: 'Русинсыкый'
        }
      ],
      isOpenBlock: false
    }
  },
  getters: {
    getInfoById: state => id => state.pages[id],
    getLanguages: s => s.languages,
    getActiveLanguage: s => s.languages.active.text,
    getStatusOpenBlock: s => s.languages.isOpenBlock
  },
  mutations: {
    setActiveLanguage: (state, lang) => state.languages.active = lang,
    toggleLanguageBlock: s => s.languages.isOpenBlock = !s.languages.isOpenBlock
  },
  actions: {}
}
