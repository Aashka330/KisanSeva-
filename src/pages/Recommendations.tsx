import Layout from '../components/layout/Layout';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import RecommendationCenter from '../components/recommendations/RecommendationCenter';

export default function Recommendations() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={[{ label: 'Recommendations' }]} />
      </div>
      <RecommendationCenter />
    </Layout>
  );
}
