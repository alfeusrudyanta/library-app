import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { AuthLayout } from '@/components/layout/auth-layout';
import { AdminLayout } from '@/components/layout/admin-layout';
import { UserLayout } from '@/components/layout/user-layout';
import { PublicRoute } from '@/lib/route/public-route';
import { AdminRoute } from '@/lib/route/admin-route';
import { UserRoute } from '@/lib/route/user-route';
import { LoginPage } from '@/features/auth/login-page';
import { RegisterPage } from '@/features/auth/register-page';
import { AdminPage } from '@/features/admin/admin-page';
import { AddBookPage } from '@/features/admin/add-book-page';
import { EditBookPage } from '@/features/admin/edit-book-page';
import { HomePage } from '@/features/home-page';
import { BookPage } from '@/features/user/book-page';
import { AuthorPage } from '@/features/user/author-page';
import { CategoryPage } from '@/features/user/category-page';
import { MyCartPage } from '@/features/user/my-cart-page';
import { SuccessPage } from '@/features/user/success-page';
import { ProfilePage } from '@/features/user/profile-page';

export const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* Auth */}
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Route>
        </Route>

        {/* User */}
        <Route element={<UserLayout />}>
          {/* Home */}
          <Route path='/' element={<HomePage />} />

          {/* Other */}
          <Route element={<UserRoute />}>
            <Route path='/book/:id' element={<BookPage />} />
            <Route path='/author/:id' element={<AuthorPage />} />
            <Route path='/category' element={<CategoryPage />} />
            <Route path='/my-cart' element={<MyCartPage />} />
            <Route path='/success' element={<SuccessPage />} />
            <Route path='/profile' element={<ProfilePage />} />
          </Route>
        </Route>

        {/* Admin */}
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path='/admin' element={<AdminPage />} />
            <Route path='/add-book' element={<AddBookPage />} />
            <Route path='/edit-book' element={<EditBookPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
