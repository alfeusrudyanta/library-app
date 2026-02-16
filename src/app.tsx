import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { AuthLayout } from '@/components/layout/auth-layout';
import { AdminLayout } from '@/components/layout/admin-layout';
import { UserLayout } from '@/components/layout/user-layout';
import { PublicRoute } from '@/lib/public-route';
import { AdminRoute } from '@/lib/admin-route';
import { UserRoute } from '@/lib/user-route';

export const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* Auth */}
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path='/login' element={<div />} />
            <Route path='/register' element={<div />} />
          </Route>
        </Route>

        {/* User */}
        <Route element={<UserLayout />}>
          {/* Home */}
          <Route path='/' element={<div />} />

          {/* Other */}
          <Route element={<UserRoute />}>
            <Route path='/book/:id' element={<div />} />
            <Route path='/author/:id' element={<div />} />
            <Route path='/category' element={<div />} />
            <Route path='/my-cart' element={<div />} />
            <Route path='/success' element={<div />} />
            <Route path='/profile' element={<div />} />
          </Route>
        </Route>

        {/* Admin */}
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path='/admin'>
              <Route index element={<div />} />
              <Route path='add-book' element={<div />} />
              <Route path='edit-book' element={<div />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
