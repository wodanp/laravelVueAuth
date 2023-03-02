<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        $rules =  [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255',
            'password' => 'sometimes|confirmed|min:8'
        ];

        if (!$this->isMethod('CREATE')) {
            $rules['id'] = 'required';
        }

        return $rules;
    }
}
