'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { dnaApi } from '@/lib/api/client';
import { ClientDNA } from '@/types/dna';

export function CreateClientDNA() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<ClientDNA>>({
    clientName: '',
    industry: '',
    brandTone: '',
    targetAudience: {
      ageRange: '',
      gender: '',
      interests: [],
      painPoints: [],
    },
    geography: {
      country: '',
      state: '',
      city: '',
      urbanRural: 'urban',
    },
    psychographics: {
      values: [],
      lifestyle: '',
      buyingBehavior: '',
    },
    products: [],
    competitors: [],
  });

  const totalSteps = 5;

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateNestedData = (parent: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof ClientDNA] as any),
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await dnaApi.create(formData);
      console.log('✅ Client DNA Created:', response);
      alert('Client DNA created successfully!');
      // Reset form or redirect
    } catch (error) {
      console.error('Error creating DNA:', error);
      alert('Error creating Client DNA. Check console.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Create Client DNA
          </h1>
          <p className="text-gray-600">
            Build your client`s intelligence profile in {totalSteps} steps
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step <= currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-300 h-2 rounded-full">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Basic Information
              </h2>

              <Input
                label="Client Name *"
                placeholder="e.g., Acme Corporation"
                value={formData.clientName}
                onChange={(e) => updateFormData('clientName', e.target.value)}
              />

              <Select
                label="Industry *"
                value={formData.industry}
                onChange={(e) => updateFormData('industry', e.target.value)}
                options={[
                  { value: 'Technology', label: 'Technology' },
                  { value: 'Healthcare', label: 'Healthcare' },
                  { value: 'Finance', label: 'Finance' },
                  { value: 'E-commerce', label: 'E-commerce' },
                  { value: 'Education', label: 'Education' },
                  { value: 'Real Estate', label: 'Real Estate' },
                  { value: 'Food & Beverage', label: 'Food & Beverage' },
                  { value: 'Other', label: 'Other' },
                ]}
              />

              <Select
                label="Brand Tone *"
                value={formData.brandTone}
                onChange={(e) => updateFormData('brandTone', e.target.value)}
                options={[
                  { value: 'Professional', label: 'Professional' },
                  { value: 'Friendly', label: 'Friendly' },
                  { value: 'Casual', label: 'Casual' },
                  { value: 'Luxury', label: 'Luxury' },
                  { value: 'Bold', label: 'Bold' },
                  { value: 'Inspirational', label: 'Inspirational' },
                ]}
              />
            </div>
          )}

          {/* Step 2: Geography */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Geographic Information
              </h2>

              <Select
                label="Country *"
                value={formData.geography?.country}
                onChange={(e) => updateNestedData('geography', 'country', e.target.value)}
                options={[
                  { value: 'India', label: 'India' },
                  { value: 'United States', label: 'United States' },
                  { value: 'United Kingdom', label: 'United Kingdom' },
                  { value: 'Canada', label: 'Canada' },
                  { value: 'Australia', label: 'Australia' },
                ]}
              />

              <Input
                label="State/Province"
                placeholder="e.g., Karnataka"
                value={formData.geography?.state}
                onChange={(e) => updateNestedData('geography', 'state', e.target.value)}
              />

              <Input
                label="City"
                placeholder="e.g., Bengaluru"
                value={formData.geography?.city}
                onChange={(e) => updateNestedData('geography', 'city', e.target.value)}
              />

              <Select
                label="Area Type *"
                value={formData.geography?.urbanRural}
                onChange={(e) => updateNestedData('geography', 'urbanRural', e.target.value)}
                options={[
                  { value: 'urban', label: 'Urban' },
                  { value: 'semi-urban', label: 'Semi-Urban' },
                  { value: 'rural', label: 'Rural' },
                ]}
              />
            </div>
          )}

          {/* Step 3: Target Audience */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Target Audience
              </h2>

              <Select
                label="Age Range *"
                value={formData.targetAudience?.ageRange}
                onChange={(e) => updateNestedData('targetAudience', 'ageRange', e.target.value)}
                options={[
                  { value: '18-24', label: '18-24' },
                  { value: '25-34', label: '25-34' },
                  { value: '35-44', label: '35-44' },
                  { value: '45-54', label: '45-54' },
                  { value: '55+', label: '55+' },
                ]}
              />

              <Select
                label="Gender *"
                value={formData.targetAudience?.gender}
                onChange={(e) => updateNestedData('targetAudience', 'gender', e.target.value)}
                options={[
                  { value: 'All', label: 'All' },
                  { value: 'Male', label: 'Male' },
                  { value: 'Female', label: 'Female' },
                  { value: 'Non-binary', label: 'Non-binary' },
                ]}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interests (comma-separated)
                </label>
                <Input
                  placeholder="e.g., Technology, Innovation, Productivity"
                  onChange={(e) =>
                    updateNestedData(
                      'targetAudience',
                      'interests',
                      e.target.value.split(',').map((i) => i.trim())
                    )
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pain Points (comma-separated)
                </label>
                <Input
                  placeholder="e.g., Time management, High costs"
                  onChange={(e) =>
                    updateNestedData(
                      'targetAudience',
                      'painPoints',
                      e.target.value.split(',').map((i) => i.trim())
                    )
                  }
                />
              </div>
            </div>
          )}

          {/* Step 4: Psychographics */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Psychographics
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Core Values (comma-separated) *
                </label>
                <Input
                  placeholder="e.g., Innovation, Trust, Quality"
                  onChange={(e) =>
                    updateNestedData(
                      'psychographics',
                      'values',
                      e.target.value.split(',').map((i) => i.trim())
                    )
                  }
                />
              </div>

              <Input
                label="Lifestyle *"
                placeholder="e.g., Fast-paced professional"
                value={formData.psychographics?.lifestyle}
                onChange={(e) => updateNestedData('psychographics', 'lifestyle', e.target.value)}
              />

              <Input
                label="Buying Behavior *"
                placeholder="e.g., Research-driven, Impulse buyer"
                value={formData.psychographics?.buyingBehavior}
                onChange={(e) =>
                  updateNestedData('psychographics', 'buyingBehavior', e.target.value)
                }
              />
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Review & Submit
              </h2>

              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Client Name:</h3>
                  <p className="text-gray-900">{formData.clientName}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Industry:</h3>
                  <p className="text-gray-900">{formData.industry}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Brand Tone:</h3>
                  <p className="text-gray-900">{formData.brandTone}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Location:</h3>
                  <p className="text-gray-900">
                    {formData.geography?.city}, {formData.geography?.state},{' '}
                    {formData.geography?.country} ({formData.geography?.urbanRural})
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Target Audience:</h3>
                  <p className="text-gray-900">
                    {formData.targetAudience?.gender}, Age {formData.targetAudience?.ageRange}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
            >
              ← Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button onClick={() => setCurrentStep((prev) => prev + 1)}>
                Next →
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Client DNA'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}