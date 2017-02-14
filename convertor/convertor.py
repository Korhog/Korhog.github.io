import os

class ConvertorDataToVertices:
    @staticmethod
    def compute_center_point(vertices):
        return (0, 0, 0)

    @staticmethod
    def convert_hor(file):  
        current_dir = os.path.dirname(__file__) + '\\'    
        data = open(current_dir + 'data.hor')

        lines = data.readlines()
        vertice_last = None

        vertices = [] # сюда перегоним вершины
        vertices.append([])
        
        import re

        line_size = 0
        sampler = 1

        # заполняем сетку промежуточными данными
        for line in lines:
            pack = re.split('\s', line)
            if len(pack) < 4:
                continue

            scale = 2
            vertice = (
                float(float('%.2f' % round(float(pack[0]) * scale, 2))) - 419000 - 10000, 
                float(float('%.2f' % round(float(pack[1]) * scale, 2))) - 6896151,
                float(float('%.2f' % round(float(pack[2]) * scale, 2))),
                float(float('%.5f' % round(float(pack[3]), 5))))

            if vertice_last and vertice_last[0] > vertice[0]:   
                # добавляем новую строку в массив
                vertices.append([])

            vertices[len(vertices) - 1].append(vertice) 
            vertice_last = vertice
        
        # постоение поверхности
        triangles = []
        for line_idx in range(len(vertices) // sampler - 1 ) :
            # проходим все строки кроме последней
            line = vertices[line_idx * sampler]
            if (line_idx + 1) * sampler >= len(vertices):
                continue
            for vertice_idx in range(len(line) // sampler - 1 ) :
                if (vertice_idx + 1) * sampler >= len(line):
                    continue
                # проходим по каждой точке кроме последней и от точки
                # получаем два треугольника.abs
                vertice_a = vertices[line_idx * sampler][vertice_idx * sampler]
                vertice_b = vertices[line_idx * sampler][(vertice_idx + 1) * sampler]
                # для нижнего ряда надо преверить наличие точек
                vertice_c = None 
                vertice_d = None
                if len(vertices[(line_idx + 1) * sampler]) > vertice_idx * sampler:
                    vertice_c = vertices[(line_idx + 1) * sampler][vertice_idx * sampler]  

                if len(vertices[(line_idx + 1) * sampler]) > (vertice_idx + 1) * sampler:  
                    vertice_d = vertices[(line_idx + 1) * sampler][(vertice_idx + 1) * sampler]

                if vertice_a and vertice_b and vertice_c:
                    triangles.append((vertice_a, vertice_b, vertice_c))

                if vertice_b and vertice_c and vertice_d:
                    triangles.append((vertice_b, vertice_c, vertice_d)) 
        
        # определяем центр
        x = vertices[0][0][0] + ( (vertices[len(vertices) - 1][len(vertices[len(vertices) - 1]) -1][0] - vertices[0][0][0]) / 2 )
        y = vertices[0][0][1] + ( (vertices[len(vertices) - 1][len(vertices[len(vertices) - 1]) -1][1] - vertices[0][0][1]) / 2 ) 

        output = open(current_dir + 'output_max.mesh', 'w')
        # output.writeLine(str())
        output.write(str((x,y)) + '\n')
        for t in triangles:
            output.write(str(t) + '\n')
            
        output.close()
        print(len(triangles))
        print('finish')

print(__file__)

ConvertorDataToVertices.convert_hor('data')
