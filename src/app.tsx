import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { AuthLayout } from '@/components/layout/auth-layout';
import { HeaderLayout } from '@/components/layout/header-layout';
import { FooterLayout } from '@/components/layout/footer-layout';
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
import { CheckoutPage } from '@/features/user/checkout-page';
import { PreviewPage } from '@/features/admin/preview-page';

export const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route element={<PublicRoute />}>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Route>
        </Route>

        {/* User */}
        <Route element={<HeaderLayout />}>
          {/* Home */}
          <Route element={<FooterLayout />}>
            <Route path='/' element={<HomePage />} />
          </Route>

          {/* Other */}
          <Route element={<UserRoute />}>
            <Route element={<FooterLayout />}>
              <Route path='/book/:id' element={<BookPage />} />
              <Route path='/category' element={<CategoryPage />} />
              <Route path='/author/:id' element={<AuthorPage />} />
              <Route path='/my-cart' element={<MyCartPage />} />
              <Route path='/checkout' element={<CheckoutPage />} />
              <Route path='/profile' element={<ProfilePage />} />
            </Route>

            <Route path='/success' element={<SuccessPage />} />
          </Route>
        </Route>

        {/* Admin */}
        <Route element={<HeaderLayout />}>
          <Route element={<AdminRoute />}>
            <Route path='/admin' element={<AdminPage />} />
            <Route path='/add-book' element={<AddBookPage />} />
            <Route path='/preview/:id' element={<PreviewPage />} />
            <Route path='/edit-book/:id' element={<EditBookPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
