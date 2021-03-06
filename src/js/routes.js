
import HomePage from '../pages/home.jsx';
import AboutPage from '../pages/about.jsx';
import FormPage from '../pages/form.jsx';

import DynamicRoutePage from '../pages/dynamic-route.jsx';
import RequestAndLoad from '../pages/request-and-load.jsx';
import NotFoundPage from '../pages/404.jsx';
import ProjectsPage from '../pages/projects';
import ProjectPage from '../pages/project';
import TasksPage from '../pages/tasks';
import PeoplePage from '../pages/people';
import ClientsPage from '../pages/clients';
import ProfilePage from '../pages/profile';
import LoginPage from '../pages/login';
import BriefPage from '../pages/brief';
import ManuscriptPage from '../pages/manuscript';
import StoryboardPage from '../pages/storyboard';
import VoiceoverPage from '../pages/voiceover';
import IllustrationsPage from '../pages/illustrations';
import AnimationPage from '../pages/animation';
import DeliveryPage from '../pages/delivery'

import store from './store';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/login/',
    component: LoginPage,
  },
  {
    path: '/projects/',
    component: ProjectsPage,
  },
  {
    path: '/project/:id',
    // component: ProjectPage,
    async: function ({ router, to, resolve }) {
      // App instance
      var app = router.app;

      // Show Preloader
      // app.preloader.show();
      
      try {
        store.dispatch('setProject',to.params.id)
        // app.preloader.hide();
      }
      catch (error) {
        console.log(error)
      }
      

      // Resolve route to load page
      resolve({component: ProjectPage}
      );

    }
  },
  {
    path: '/tasks/',
    component: TasksPage,
  },
  {
    path: '/people/',
    component: PeoplePage,
  },
  {
    path: '/clients/',
    component: ClientsPage,
  },
  {
    path: '/profile/',
    component: ProfilePage,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: '/brief/:id',
    component: BriefPage,
  },
  {
    path: '/manuscript/:id',
    component: ManuscriptPage,
  },
  {
    path: '/voiceover/:id',
    component: VoiceoverPage,
  },
  {
    path: '/storyboard/:id',
    component: StoryboardPage,
  },
  {
    path: '/illustrations/:id',
    component: IllustrationsPage,
  },
  {
    path: '/animation/:id',
    component: AnimationPage,
  },
  {
    path: '/delivery/:id',
    component: DeliveryPage,
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function ({ router, to, resolve }) {
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = to.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            props: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
