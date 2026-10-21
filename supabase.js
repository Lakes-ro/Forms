import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://ywossdxnqhrhznglsvcr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3b3NzZHhucWhyaHpuZ2xzdmNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxOTIzMjcsImV4cCI6MjA4OTc2ODMyN30.q654hvqIXjT2qi5fsLKYLx_VwCkFRCHNdYqHBfN08Uo';

// URL do sistema para onde a usuária será redirecionada após o envio
const REDIRECT_URL = 'https://educacaofinanceira.vercel.app/';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.getElementById('form-pesquisa');
const submitBtn = document.getElementById('btn-submit');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Desabilita o botão para evitar múltiplos envios
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = 'Enviando...';
  }

  const formData = new FormData(form);
  const dados = Object.fromEntries(formData.entries());

  // Tratar múltiplos checkboxes caso existam no formulário
  const metas = formData.getAll('metas');
  if (metas.length > 0) {
    dados.metas = metas;
  }

  try {
    const { data, error } = await supabase
      .from('pesquisa_respostas')
      .insert([dados]);

    if (error) {
      throw error;
    }

    alert('Obrigado por participar! 💜 Resposta enviada com sucesso.');
    form.reset();

    // Redireciona para o sistema
    window.location.href = REDIRECT_URL;

  } catch (error) {
    alert('Erro ao enviar respostas. Tente novamente.');
    console.error('Erro no Supabase:', error);

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = 'Enviar Respostas';
    }
  }
});
