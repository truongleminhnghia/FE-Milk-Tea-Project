import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getByIdService } from '../../services/recipe.service';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await getByIdService(id);
        if (res?.success && res?.data) {
          setRecipe(res.data);
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Recipe not found!</h2>
          <p className="text-gray-600">The recipe you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={recipe?.imageUrl}
            alt={recipe?.recipeTitle}
            className="w-full h-full object-cover transform scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-6xl font-bold mb-6 drop-shadow-lg animate-fade-in">{recipe?.recipeTitle}</h1>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                <span className="text-lg">⏱️ 30 mins</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                <span className="text-lg">👥 4 servings</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                <span className="text-lg">🍽️ Medium</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                <span className="text-lg">🔥 350 calories</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 -mt-12">
        {/* Description Section */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl mb-8 transform hover:scale-[1.01] transition-all duration-300">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="mr-2">📝</span> Mô tả
          </h2>
          <div className="prose max-w-none text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: recipe?.content }} />
        </div>

        {/* Ingredients Section */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl mb-8 transform hover:scale-[1.01] transition-all duration-300">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="mr-2">🥛</span> Nguyên liệu
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipe?.ingredients?.map((ingredient) => (
              <div 
                key={ingredient.id} 
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={ingredient?.images?.[0]?.imageUrl}
                      alt={ingredient.ingredientName}
                      className="w-24 h-24 object-cover rounded-full ring-4 ring-purple-100"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{ingredient.ingredientName}</h3>
                    <p className="text-gray-600 mt-1 line-clamp-2">{ingredient?.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions Section */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl transform hover:scale-[1.01] transition-all duration-300">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="mr-2">📋</span> Hướng dẫn
          </h2>
          <div className="space-y-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-start space-x-6 group">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-all duration-300">
                  {step}
                </div>
                <div className="flex-grow bg-white p-6 rounded-xl shadow-md group-hover:shadow-xl transition-all duration-300">
                  <p className="text-gray-600 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RecipeDetail;
