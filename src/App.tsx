import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from './components/Header';
import Categories from './components/Categories';
import OfferCarousel from './components/OfferCarousel';
import QuickActions from './components/QuickActions';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-vh-100 bg-light">
      <Header />
      <main>
        <OfferCarousel />
        <Categories />
        <QuickActions />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
}

export default App;