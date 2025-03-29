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
    return <div className="text-center text-lg text-gray-500">Loading...</div>;
  }

  if (!recipe) {
    return <div className="text-center text-lg text-red-600">Recipe not found!</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Title and Image */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">{recipe?.recipeTitle}</h1>
        <img
          src={recipe?.imageUrl}
          alt={recipe?.recipeTitle}
          className="w-full max-w-lg mx-auto mt-4 rounded-xl shadow-md"
        />
      </div>

      {/* Description Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-semibold text-gray-800">Mô tả</h2>
        <div className="mt-4 text-gray-600" dangerouslySetInnerHTML={{ __html: recipe?.content }} />
      </div>

      {/* Ingredients Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800">Nguyên liệu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
          {recipe?.ingredients?.map((ingredient) => (
            <div key={ingredient.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
              <img
                src={ingredient?.images?.[0]?.imageUrl}
                alt={ingredient.ingredientName}
                className="w-32 h-32 object-cover mx-auto rounded-full mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800 text-center">{ingredient.ingredientName}</h3>
              <p className="text-sm text-gray-500 mt-2">{ingredient?.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
